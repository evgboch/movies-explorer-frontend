import "./Register.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/validationHook.js";
import { login, register } from "../../utils/mainApi";
import { ERROR_MESSAGES, ERROR_STATUSES, LOCAL_STORAGE, SUBMIT_BTN_TITLES } from "../../utils/constants";

function Register({ setIsLoggedIn, setCurrentUser }) {
  const validation = useFormWithValidation();
  const history = useHistory();
  const [buttonTitle, setButtonTitle] = React.useState(SUBMIT_BTN_TITLES.register.static);
  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(() => {
    validation.validateName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.inputValues.name]);

  React.useEffect(() => {
    validation.validateEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.inputValues.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonTitle(SUBMIT_BTN_TITLES.register.inProgress);
    setIsDisabled(true);

    register(validation.inputValues.email, validation.inputValues.password, validation.inputValues.name)
      .then((res) => {
        setCurrentUser({
          email: res.email,
          name: res.name,
          _id: res._id,
        });
        login(validation.inputValues.email, validation.inputValues.password)
          .then((res) => {
            localStorage.setItem(LOCAL_STORAGE.token, res.token);
            setIsLoggedIn(true);
            history.push("/movies");
            validation.resetForm();
            setButtonTitle(SUBMIT_BTN_TITLES.register.static);
            setIsDisabled(false);
          })
          .catch((err) => {
            Promise.reject(err);
          });
      })
      .catch((err) => {
        setButtonTitle(SUBMIT_BTN_TITLES.register.static);
        setIsDisabled(false);
        if (err.status === ERROR_STATUSES.conflict) {
          validation.setSubmitError(ERROR_MESSAGES.register.invalidEmail);
        } else {
          validation.setSubmitError(ERROR_MESSAGES.register.commonError);
        }
      });
  }

  return (
    <main className="register">
      <form noValidate className="register__form" onSubmit={ handleSubmit }>
        <label className="register__form-label " htmlFor="register-name">
          Имя
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.name || "" }
            className={ "register__form-input" + (validation.inputErrors.name ? " register__form-input_error" : "") }
            id="register-name"
            name="name"
            type="text"
            autoComplete="off"
            required={ true }
            disabled={ isDisabled }
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "register__form-error" + (validation.inputErrors.name ? " register__form-error_visible" : "") }>
            { validation.inputErrors.name }
          </span>
        </label>
        <label className="register__form-label" htmlFor="register-email">
          E-mail
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.email || "" }
            className={ "register__form-input" + (validation.inputErrors.email ? " register__form-input_error" : "") }
            id="register-email"
            name="email"
            required={ true }
            disabled={ isDisabled }
            type="email"
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "register__form-error" + (validation.inputErrors.email ? " register__form-error_visible" : "") }>
            { validation.inputErrors.email }
          </span>
        </label>
        <label className="register__form-label " htmlFor="register-password">
          Пароль
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.password || "" }
            className={ "register__form-input" + (validation.inputErrors.password ? " register__form-input_error" : "") }
            id="register-password"
            name="password"
            type="password"
            autoComplete="off"
            required={ true }
            disabled={ isDisabled }
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "register__form-error" + (validation.inputErrors.password ? " register__form-error_visible" : "") }>
            { validation.inputErrors.password }
          </span>
        </label>
        <span
          className={ "register__submit-error" + (validation.submitError ? " register__submit-error_visible" : "") }>
          { validation.submitError }
        </span>
        <button
          className={ "register__submit" + ((!validation.isValid || isDisabled) ? " register__submit_disabled" : "") }
          type="submit"
          disabled={ (validation.isValid && !isDisabled)? false : true }>
          { buttonTitle }
        </button>
      </form>
      <div className="register__container">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link className="register__link" to="/signin">Войти</Link>
      </div>
    </main>
  )
}

export default Register;
