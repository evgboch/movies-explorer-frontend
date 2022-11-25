import "./Header.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import AccountLink from "../AccountLink/AccountLink";

function Header({ view, isLoggedIn, onMenuClick, isMenuOpen }) {
  if (!isLoggedIn) {
    return (
      <header className={ "header" + ((view === "main") ? " header_main" : "") }>
          <div className="header__container">
            <Link to="/" className="header__logo"></Link>
            <div className="header__right-side">
              <Link to="/signup" className="header__register">Регистрация</Link>
              <Link to="/signin" className="header__login">Войти</Link>
            </div>
          </div>
      </header>
    )
  } else {
    return (
      <header className={"header" + ((view === "main") ? " header_main" : "")}>
        <div className="header__container">
          <Link to="/" className="header__logo"></Link>
          <div className="header__mid-side">
            <NavLink to="/movies" className="header__movies" activeClassName="header__movies_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__saved-movies" activeClassName="header__movies_active">Сохранённые фильмы</NavLink>
          </div>
          <div className={"header__menu-button" + (isMenuOpen ? " header__menu-button_opened" : "")} onMouseDown={ onMenuClick }>
            <div className="header__burger"></div>
          </div>
          <AccountLink cls="account account_desktop" />
        </div>
      </header>
    )
  }
}

export default Header;
