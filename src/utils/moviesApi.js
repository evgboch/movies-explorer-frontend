import { MOVIES_URL } from "./constants";

export function loadMovies() {
  return fetch(MOVIES_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }})
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        debugger
        return Promise.reject(res);
      })
}
