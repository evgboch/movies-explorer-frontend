import "./Login.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/validationHook.js";
import { login, getUserInfo, getSavedMovies } from "../../utils/mainApi";
import { ERROR_MESSAGES, ERROR_STATUSES, LOCAL_STORAGE, SUBMIT_BTN_TITLES } from "../../utils/constants";

function Login({ setIsLoggedIn, setCurrentUser, setSavedMovies }) {
  const validation = useFormWithValidation();
  const history = useHistory();
  const [buttonTitle, setButtonTitle] = React.useState(SUBMIT_BTN_TITLES.login.static);
  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(() => {
    validation.validateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.inputValues.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonTitle(SUBMIT_BTN_TITLES.login.inProgress);
    setIsDisabled(true);

    login(validation.inputValues.email, validation.inputValues.password)
      .then((res) => {
        localStorage.setItem(LOCAL_STORAGE.token, res.token);
        setIsLoggedIn(true);
        history.push("/movies");
        validation.resetForm();
        setButtonTitle(SUBMIT_BTN_TITLES.login.static);
        setIsDisabled(false);

        getUserInfo(res.token)
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            Promise.reject(err);
          });

        getSavedMovies()
          .then((movies) => {
            setSavedMovies(movies.reverse());
          })
          .catch((err) => {
            Promise.reject(err);
          });
      })
      .catch((err) => {
        setButtonTitle(SUBMIT_BTN_TITLES.login.static);
        setIsDisabled(false);
        if (err.status === ERROR_STATUSES.unauthorized) {
          validation.setSubmitError(ERROR_MESSAGES.login.credentials);
        } else {
          validation.setSubmitError(ERROR_MESSAGES.login.commonError);
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
            value={ validation.inputValues.email || "" }
            className={ "login__form-input" + (validation.inputErrors.email ? " login__form-input_error" : "") }
            id="login-email"
            name="email"
            required={ true }
            disabled={ isDisabled }
            type="email"
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "login__form-error" + (validation.inputErrors.email ? " login__form-error_visible" : "") }>
            { validation.inputErrors.email }
          </span>
        </label>
        <label className="login__form-label" htmlFor="login-password">
          Пароль
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.password || "" }
            className={ "login__form-input" + (validation.inputErrors.password ? " login__form-input_error" : "") }
            id="login-password"
            name="password"
            type="password"
            autoComplete="on"
            required={ true }
            disabled={ isDisabled }
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "login__form-error" + (validation.inputErrors.password ? " login__form-error_visible" : "") }>
            { validation.inputErrors.password }
          </span>
        </label>
        <span
          className={ "login__submit-error" + (validation.submitError ? " login__submit-error_visible" : "") }>
          { validation.submitError }
        </span>
        <button
          className={ "login__submit" + ((!validation.isValid || isDisabled) ? " login__submit_disabled" : "") }
          type="submit"
          disabled={ (validation.isValid && !isDisabled) ? false : true }>
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
