import "./Register.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/Validator.js";
import { login, register } from "../../utils/MainApi";
import { errorMessages } from "../../utils/constants";

function Register({ setIsLoggedIn, setCurrentUser }) {
  const validation = useFormWithValidation();
  const history = useHistory();
  const [buttonTitle, setButtonTitle] = React.useState("Зарегистрироваться");

  React.useEffect(() => {
    validation.validateName();
  }, [validation.inputValues.name]);

  React.useEffect(() => {
    validation.validateEmail();
  }, [validation.inputValues.email]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonTitle("Регистрация...");

    register(validation.inputValues.email, validation.inputValues.password, validation.inputValues.name)
      .then((res) => {
        setCurrentUser({
          email: res.email,
          name: res.name,
          _id: res._id,
        });
        login(validation.inputValues.email, validation.inputValues.password)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            history.push("/movies");
            validation.resetForm();
            setButtonTitle("Зарегистрироваться");
          })
          .catch((err) => {
            Promise.reject(err);
          });
      })
      .catch((err) => {
        setButtonTitle("Зарегистрироваться");
        if (err.status === 409) {
          validation.setSubmitError(errorMessages.register.invalidEmail);
        } else {
          validation.setSubmitError(errorMessages.register.commonError);
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
          value={validation.inputValues.name || ""}
          className={"register__form-input" + (validation.inputErrors.name ? " register__form-input_error" : "")}
          id="register-name"
          name="name"
          type="text"
          autoComplete="off"
          required={ true }
          minLength="2"
          maxLength="30">
          </input>
          <span
          className={"register__form-error" + (validation.inputErrors.name ? " register__form-error_visible" : "")}>
            {validation.inputErrors.name}
          </span>
        </label>
        <label className="register__form-label" htmlFor="register-email">
          E-mail
          <input
          onChange={ validation.handleChange }
          value={validation.inputValues.email || ""}
          className={"register__form-input" + (validation.inputErrors.email ? " register__form-input_error" : "")}
          id="register-email"
          name="email"
          required={ true }
          type="email"
          minLength="2"
          maxLength="30">
          </input>
          <span
          className={"register__form-error" + (validation.inputErrors.email ? " register__form-error_visible" : "")}>
            {validation.inputErrors.email}
          </span>
        </label>
        <label className="register__form-label " htmlFor="register-password">
          Пароль
          <input
          onChange={ validation.handleChange }
          value={validation.inputValues.password || ""}
          className={"register__form-input" + (validation.inputErrors.password ? " register__form-input_error" : "")}
          id="register-password"
          name="password"
          type="password"
          autoComplete="off"
          required={ true }
          minLength="2"
          maxLength="30">
          </input>
          <span
          className={"register__form-error" + (validation.inputErrors.password ? " register__form-error_visible" : "")}>
            {validation.inputErrors.password}
          </span>
        </label>
        <span
        className={"register__submit-error" + (validation.submitError ? " register__submit-error_visible" : "")}>
          { validation.submitError }
        </span>
        <button
        className={"register__submit" + (!validation.isValid ? " register__submit_disabled" : "")}
        type="submit"
        disabled={ validation.isValid ? false : true }>
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
