import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import AccountLink from "../AccountLink/AccountLink";

function Header({ view, isLoggedIn, onMenuClick }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick();
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
          <div className={"header__menu-button" + (isMenuOpen ? " header__menu-button_opened" : "")} onClick={ handleMenuClick }>
            <div className="header__burger"></div>
          </div>
          <AccountLink cls="account account_desktop" />
      </header>
    )
  }
}

export default Header;
