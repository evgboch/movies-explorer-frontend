import "./Profile.css";

function Profile() {
  return (
    <main className="profile">
      <h2 className="profile__greeting">Привет, Евгений!</h2>
      <div className="profile__info">
        <p className="profile__title">Имя</p>
        <p className="profile__value">Евгений</p>
      </div>
      <div className="profile__info">
        <p className="profile__title">E-mail</p>
        <p className="profile__value">pochta@yandex.ru</p>
      </div>
      <button className="profile__button profile__button_type_edit" type="button">Редактировать</button>
      <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
    </main>
  )
}

export default Profile;
