import "./Promo.css"
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import MainContainer from "../MainContainer/MainContainer";
import promoImage from "../../images/promo-image.png";

function Promo() {
  return(
    <section className="promo">
      <div className="promo__container">
        <MainContainer>
          <Header />
          <div className="promo__info">
            <div className="promo__text">
              <h1 className="promo__info-heading">Учебный проект студента факультета Веб&#8209;разработки.</h1>
              <p className="promo__info-paragraph">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
            </div>
            <img className="promo__info-image" src={promoImage} alt="Мир веб-разработки" />
          </div>
          <Link to="#" className="promo__learn-more">Узнать больше</Link>
        </MainContainer>
      </div>
    </section>
  )
}

export default Promo;
