import "./Profile.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="profile">
      <h2 className="profile__greeting">{"Привет, " + currentUser.name + "!"}</h2>
      <div className="profile__info">
        <p className="profile__title">Имя</p>
        <p className="profile__value">{ currentUser.name }</p>
      </div>
      <div className="profile__info">
        <p className="profile__title">E-mail</p>
        <p className="profile__value">{ currentUser.email }</p>
      </div>
      <button className="profile__button profile__button_type_edit" type="button">Редактировать</button>
      <button className="profile__button profile__button_type_logout" type="button" onMouseDown={ onSignOut }>Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;
