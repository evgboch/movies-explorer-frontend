import "./Header.css";
import { Link } from "react-router-dom";

function Header({ view, isLoggedIn }) {
  if (!isLoggedIn) {
    return (
      <header className={"header" + ((view === "main") ? " header_main" : "")}>
          <Link to="/" className="header__logo"></Link>
          <div className="header__right-side">
            <Link to="#" className="header__register-link">Регистрация</Link>
            <Link to="#" className="header__login-link">Войти</Link>
          </div>
      </header>
    )
  }
}

export default Header;
