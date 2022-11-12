import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="register">
      <form className="register__form">
        <label className="register__form-label" htmlFor="register-name">
          Имя
          <input className="register__form-input" id="register-name"></input>
          <span class="register__form-error"></span>
        </label>
        <label className="register__form-label" htmlFor="register-email">
          E-mail
          <input className="register__form-input" id="register-email"></input>
          <span class="register__form-error"></span>
        </label>
        <label className="register__form-label " htmlFor="register-password">
          Пароль
          <input className="register__form-input register__form-input_error" id="register-password" type="password"></input>
          <span class="register__form-error register__form-error_visible">Что-то пошло не так...</span>
        </label>
        <button className="register__submit" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      <div className="register__container">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link className="register__link" to="/signin">Войти</Link>
      </div>
    </main>
  )
}

export default Register;
