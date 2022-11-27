import { MOVIES_URL } from "./constants";

export function loadMovies() {
  return fetch(MOVIES_URL.full, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }})
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
}
