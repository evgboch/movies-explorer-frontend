// import { MOVIES_URL } from "./constants";

// // function checkResponse(res) {
// //   if(res.ok) {
// //     return res.json();
// //   }
// //   return Promise.reject(res);
// // }

// export function loadMovies() {
//   return fetch(MOVIES_URL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }})
//       .then((res) => {
//         if(res.ok) {
//           debugger
//           return res.json();
//           // return res;
//         }
//         debugger
//         return Promise.reject(res);
//       })
// }



class ApiMov {
  constructor(options) {
      this._baseUrl = options.baseUrl
      this._headers = options.headers
  };

  //Загрузка информации о пользователе с сервера
  getMovies() {
      return fetch(`${this._baseUrl}`, {
          headers: this._headers,
      })
          .then((res) => {
              return this._testStatus(res)
          })
  };


  //Проверяем на ошибку
  _testStatus(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`${res}`);
  }

}
const apiMov = new ApiMov({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      'Content-Type': 'application/json',
  }
});
export default apiMov
