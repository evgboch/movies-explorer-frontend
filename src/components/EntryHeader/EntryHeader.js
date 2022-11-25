import { Link } from "react-router-dom";
import "./EntryHeader.css";


function EntryHeader({ children }) {
  return (
    <header className="entry-header">
      <Link to="/" className="entry-header__logo"></Link>
      <h2 className="entry-header__greeting">{ children }</h2>
    </header>
  )
}

export default EntryHeader;
