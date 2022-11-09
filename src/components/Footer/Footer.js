import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__copyrights">&copy; 2022. Евгений Бочаров</p>
          <div className="footer__links">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a className="footer__link" href="https://github.com/evgboch" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
