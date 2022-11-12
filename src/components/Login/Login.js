import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="login">
      <form className="login__form">
        <label className="login__form-label" htmlFor="login-email">
          E-mail
          <input className="login__form-input" id="login-email"></input>
          <span class="login__form-error"></span>
        </label>
        <label className="login__form-label" htmlFor="login-password">
          Пароль
          <input className="login__form-input" id="login-password" type="password"></input>
          <span class="login__form-error"></span>
        </label>
        <button className="login__submit" type="submit" onClick={handleSubmit}>Войти</button>
      </form>
      <div className="login__container">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link className="login__link" to="/signup">Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;
