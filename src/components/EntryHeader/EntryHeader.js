import "./EntryHeader.css";

function EntryHeader({ children }) {
  return (
    <header className="entry-header">
      <div className="entry-header__logo"></div>
      <h2 className="entry-header__greeting">{ children }</h2>
    </header>
  )
}

export default EntryHeader;
