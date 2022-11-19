const emailRegExp = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/i);
const nameRegExp = new RegExp(/^[a-zа-яё\s]+$/i);

const BASE_URL = 'https://api.evg.nomoredomains.icu';

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
};

export { emailRegExp, nameRegExp, BASE_URL, errorMessages };
