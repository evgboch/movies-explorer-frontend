import { BASE_URL } from "./constants";

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
    })
      .then(checkResponse)
}

function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse);
}

function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    }
  })
    .then(checkResponse);
}

function saveMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  // owner,
  movieId,
  nameRU,
  nameEN,
}) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailerLink: trailerLink,
      thumbnail: thumbnail,
      // owner: owner,
      movieId: movieId,
      nameRU: nameRU,
      nameEN: nameEN,
    })
  })
    .then(checkResponse);
}

function deleteMovie(movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    }
  })
    .then(checkResponse);
}

export {
  register,
  login,
  getUserInfo,
  getSavedMovies,
  saveMovie,
  deleteMovie,
};

