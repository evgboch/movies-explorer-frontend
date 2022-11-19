import { BASE_URL } from "./constants";

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

// `Ошибка: ${res.status}`

// export function register(password, email) {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({password, email})
//     })
//       .then(checkResponse)
// }

export function login (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

export function getUserInfo (token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponse);
}

