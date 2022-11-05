import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return(
    <nav className="header">
          <Link to="#" className="header__logo"></Link>
          <div className="header__right-side">
            <Link to="#" className="header__register-link">Регистрация</Link>
            <Link to="#" className="header__login-link">Войти</Link>
          </div>
    </nav>
  )
}

export default Header;
