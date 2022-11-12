import { NavLink } from "react-router-dom";
import "./Navigation.css";
import AccountLink from "../AccountLink/AccountLink";

function Navigation({ isOpen }) {
  return(
    <nav className={"navigation" + (isOpen ? " navigation_opened" : "")}>
      <ul className="navigation__container">
        <li className="navigation__item">
          <NavLink className="navigation__link" activeClassName="navigation__link_active" exact to="/">Главная</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className="navigation__link" activeClassName="navigation__link_active" to="/movies">Фильмы</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className="navigation__link" activeClassName="navigation__link_active" to="/saved-movies">Сохранённые Фильмы</NavLink>
        </li>
        <li className="navigation__item">
          <AccountLink cls="account account_tablet" />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
