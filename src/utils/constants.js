const emailRegExp = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/i);
const nameRegExp = new RegExp(/^[a-zа-яё\s]+$/i);

const BASE_URL = "https://api.evg.nomoredomains.icu";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

const errorMessages = {
  login: {
    credentials: "Вы ввели неправильный логин или пароль.",
    commonError: "При авторизации произошла ошибка.",
  },
  register: {
    invalidEmail: "Пользователь с таким email уже существует.",
    commonError: "При регистрации пользователя произошла ошибка.",
  },
  update: {
    invalidEmail: "Пользователь с таким email уже существует.",
    commonError: "При обновлении профиля произошла ошибка.",
  },
  serverError: "На сервере произошла ошибка.",
  validation: {
    email: 'Введите домен верхнего уровня. Например, ".ru".',
    name: "Имя может содержать только латиницу, кириллицу, пробел или дефис.",
  }
};

export { emailRegExp, nameRegExp, BASE_URL, MOVIES_URL, errorMessages };
