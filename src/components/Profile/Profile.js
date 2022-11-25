/* eslint-disable react-hooks/exhaustive-deps */
import "./Profile.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validationHook.js";
import { updateUserInfo } from "../../utils/mainApi";
import { errorMessages } from "../../utils/constants";

function Profile({ onSignOut, setCurrentUser }) {
  const [buttonTitle, setButtonTitle] = React.useState("Редактировать");
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const validation = useFormWithValidation();

  React.useEffect(() => {
    validation.setInputValues({
      name: currentUser ? currentUser.name : "",
      email: currentUser ? currentUser.email : ""
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (currentUser) {
      validation.validateName();
      checkValuesNotChanged();
    }
    setIsSuccessMsgVisible(false);
  }, [validation.inputValues.name]);

  React.useEffect(() => {
    if (currentUser) {
      validation.validateEmail();
      checkValuesNotChanged();
    }
    setIsSuccessMsgVisible(false);
  }, [validation.inputValues.email]);

  function checkValuesNotChanged() {
    if ((validation.inputValues.email === currentUser.email) && (validation.inputValues.name === currentUser.name)) {
      validation.setIsValid(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    setButtonTitle("Редактирование...");
    updateUserInfo(validation.inputValues.email, validation.inputValues.name)
      .then((res) => {
        setCurrentUser(res);
        validation.setIsValid(false);
        setButtonTitle("Редактировать");
        setIsSuccessMsgVisible(true);
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
    <main className="profile">
      <h2 className="profile__greeting">{ "Привет, " + (currentUser ? currentUser.name : "") + "!" }</h2>
      <form noValidate className="profile__form" onSubmit={ handleSubmit }>
        <div className="profile__container">
          <label className="profile__form-label " htmlFor="register-name">Имя</label>
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.name || "" }
            className="profile__form-input profile__form-input_type_name"
            id="profile-name"
            name="name"
            type="text"
            autoComplete="off"
            required={ true }
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "profile__form-error" + (validation.inputErrors.name ? " profile__form-error_visible" : "") }>
            { validation.inputErrors.name }
          </span>
        </div>
        <div className="profile__container">
          <label className="profile__form-label" htmlFor="profile-email">E-mail</label>
          <input
            onChange={ validation.handleChange }
            value={ validation.inputValues.email || "" }
            className="profile__form-input profile__form-input_type_email"
            id="profile-email"
            name="email"
            required={ true }
            type="email"
            minLength="2"
            maxLength="30">
          </input>
          <span
            className={ "profile__form-error" + (validation.inputErrors.email ? " profile__form-error_visible" : "") }>
            { validation.inputErrors.email }
          </span>
        </div>
        <span
          className={ "profile__submit-error" + (validation.submitError ? " profile__submit-error_visible" : "") }>
          { validation.submitError }
        </span>
        <span
          className={ "profile__submit-success" + (isSuccessMsgVisible ? " profile__submit-success_visible" : "") }>
          Информация сохранена.
        </span>
        <button
          className={ "profile__button profile__button_type_edit" + (!validation.isValid ? " profile__button_disabled" : "") }
          type="submit"
          disabled={ validation.isValid ? false : true }>
          { buttonTitle }
        </button>
      </form>
      <button
        className="profile__button profile__button_type_logout"
        type="button"
        onMouseDown={ onSignOut }>
        Выйти из аккаунта
      </button>
    </main>
  )
}

export default Profile;
