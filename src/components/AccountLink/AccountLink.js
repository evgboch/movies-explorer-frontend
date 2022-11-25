import { Link } from "react-router-dom";
import "./AccountLink.css";

function AccountLink({ cls }) {
  return (
    <Link className={ cls } to="/profile">
      <p className="account__title">Аккаунт</p>
      <div className="account__logo"></div>
    </Link>
  )
}

export default AccountLink;
