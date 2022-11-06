import "./Portfolio.css";
import linkArrow from "../../images/link-arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__links-list">
        <li className="portfolio__list-item">
          <a href="https://github.com/evgboch/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
            Статичный сайт
            <img className="portfolio__link-img" src={linkArrow} alt="Указатель ссылки"></img>
          </a>

        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/evgboch/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <img className="portfolio__link-img" src={linkArrow} alt="Указатель ссылки"></img>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/evgboch/react-mesto-api-full" className="portfolio__link" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <img className="portfolio__link-img" src={linkArrow} alt="Указатель ссылки"></img>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;
