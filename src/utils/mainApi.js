import { BASE_URL, LOCAL_STORAGE } from "./constants";

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, name })
    })
      .then(checkResponse)
}

function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
    .then(checkResponse);
}

function updateUserInfo(email, name) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(LOCAL_STORAGE.token)}`,
    },
    body: JSON.stringify({ email, name })
  })
    .then(checkResponse);
}

function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(LOCAL_STORAGE.token)}`,
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
  movieId,
  nameRU,
  nameEN,
}) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(LOCAL_STORAGE.token)}`,
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
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(LOCAL_STORAGE.token)}`,
    }
  })
    .then(checkResponse);
}

export {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  getSavedMovies,
  saveMovie,
  deleteMovie,
};

