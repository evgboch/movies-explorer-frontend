import "./Header.css";
import { Link } from "react-router-dom";

function Header({ view, isLoggedIn }) {
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
          <div className="header__account">
            {/* <Link to="#" className="header__account-title">Аккаунт</Link> */}
            <p className="header__account-title">Аккаунт</p>
            <div className="header__account__logo"></div>
          </div>
      </header>
    )
  }
}

export default Header;
