import "./Login.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/Validator.js";
import { login, getUserInfo } from "../../utils/MainApi";
import { errorMessages } from "../../utils/constants";

function Login({ setIsLoggedIn, setCurrentUser }) {
  const validation = useFormWithValidation();
  const history = useHistory();
  const [buttonTitle, setButtonTitle] = React.useState("Войти");

  React.useEffect(() => {
    validation.validateEmail();
  }, [validation.inputValues.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonTitle("Вход...");

    login(validation.inputValues.email, validation.inputValues.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        history.push("/movies");
        validation.resetForm();
        setButtonTitle("Войти");

        getUserInfo(res.token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          Promise.reject(err);
        })
      })
      .catch((err) => {
        setButtonTitle("Войти");
        if (err.status === 401) {
          validation.setSubmitError(errorMessages.login.credentials);
        } else {
          validation.setSubmitError(errorMessages.login.commonError);
        }
      });
  }

  return (
    <main className="login">
      <form noValidate className="login__form" onSubmit={ handleSubmit }>
        <label className="login__form-label" htmlFor="login-email">
          E-mail
          <input
          onChange={ validation.handleChange }
          value={validation.inputValues.email || ""}
          className={"login__form-input" + (validation.inputErrors.email ? " login__form-input_error" : "")}
          id="login-email"
          name="email"
          required={ true }
          type="email"
          minLength="2"
          maxLength="30">
          </input>
          <span
          className={"login__form-error" + (validation.inputErrors.email ? " login__form-error_visible" : "")}>
            {validation.inputErrors.email}
          </span>
        </label>
        <label className="login__form-label" htmlFor="login-password">
          Пароль
          <input
          onChange={ validation.handleChange }
          value={validation.inputValues.password || ""}
          className={"login__form-input" + (validation.inputErrors.password ? " login__form-input_error" : "")}
          id="login-password"
          name="password"
          type="password"
          autoComplete="on"
          required={ true }
          minLength="2"
          maxLength="30">
          </input>
          <span
          className={"login__form-error" + (validation.inputErrors.password ? " login__form-error_visible" : "")}>
            {validation.inputErrors.password}
          </span>
        </label>
        <span
        className={"login__submit-error" + (validation.submitError ? " login__submit-error_visible" : "")}>
          { validation.submitError }
        </span>
        <button
        className={"login__submit" + (!validation.isValid ? " login__submit_disabled" : "")}
        type="submit"
        disabled={ validation.isValid ? false : true }>
          { buttonTitle }
        </button>
      </form>
      <div className="login__container">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link className="login__link" to="/signup">Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;
