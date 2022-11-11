import "./AccountLink.css";

function AccountLink({ cls }) {
  return (
    <div className={ cls }>
      <p className="account__title">Аккаунт</p>
      <div className="account__logo"></div>
    </div>
  )
}

export default AccountLink;
