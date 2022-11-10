import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

function Header({ view, isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  if (!isLoggedIn) {
    return (
      <header className={"header" + ((view === "main") ? " header_main" : "")}>
          <Link to="/" className="header__logo"></Link>
          <div className="header__right-side">
            <Link to="#" className="header__register">Регистрация</Link>
            <Link to="#" className="header__login">Войти</Link>
          </div>
      </header>
    )
  } else {
    return (
      <header className={"header" + ((view === "main") ? " header_main" : "")}>
          <Link to="/" className="header__logo"></Link>
          <div className="header__mid-side">
            <Link to="#" className="header__movies">Фильмы</Link>
            <Link to="#" className="header__saved-movies">Сохранённые фильмы</Link>
          </div>
          <div class={"header__menu-button" + (isMenuOpen ? " header__menu-button_open" : "")} onClick={ handleMenuClick }>
            <div class="header__burger"></div>
          </div>
          <div className="header__account">
            <p className="header__account-title">Аккаунт</p>
            <div className="header__account__logo"></div>
          </div>
      </header>
    )
  }
}

export default Header;
