const REG_EXPS = {
  email: new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/i),
  name: new RegExp(/^[a-zа-яё\s]+$/i),
}

const BASE_URL = "https://api.evg.nomoredomains.icu";

const MOVIES_URL = {
  full: "https://api.nomoreparties.co/beatfilm-movies",
  short: "https://api.nomoreparties.co",
};

const SHORT_FILM_DURATION = 40;

const ONE_HOUR = 60;

const ERROR_STATUSES = {
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
};

const ERROR_MESSAGES = {
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
  },
  loading: {
    connectionError: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    emptyMoviesList: "Ничего не найдено.",
  },
  notFound: "Страница не найдена.",
  emptySearchForm: "Заполните это поле.",
};

const MOVIES_LIST_CONSTANTS = {
  width: {
    desktop: 1024,
    tablet: 768
  },
  maxListLenght: {
    desktop: 12,
    tablet: 8,
    mobile: 5,
  },
  moreValue: {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  }
};

const LOCAL_STORAGE = {
  token: "jwt",
  movies: {
    list: "movies",
    request: "movieReq",
    short: "movieShort",
  }
};

const SUBMIT_BTN_TITLES = {
  register: {
    inProgress: "Регистрация...",
    static: "Зарегистрироваться",
  },
  login: {
    inProgress: "Вход...",
    static: "Войти",
  },
  edit: {
    inProgress: "Редактирование...",
    static: "Редактировать",
  }
};

export {
  REG_EXPS,
  BASE_URL,
  MOVIES_URL,
  ERROR_STATUSES,
  ERROR_MESSAGES,
  SHORT_FILM_DURATION,
  ONE_HOUR,
  MOVIES_LIST_CONSTANTS,
  LOCAL_STORAGE,
  SUBMIT_BTN_TITLES,
};
