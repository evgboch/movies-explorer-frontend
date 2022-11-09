import "./Promo.css"
import MainContainer from "../MainContainer/MainContainer";
import promoImage from "../../images/promo-image.png";

function Promo() {
  return(
    <section className="promo">
      <div className="promo__container">
        <MainContainer>
          <div className="promo__info">
            <div className="promo__text">
              <h1 className="promo__info-heading">Учебный проект студента&nbsp;факультета Веб&#8209;разработки.</h1>
              <p className="promo__info-paragraph">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
            </div>
            <img className="promo__info-image" src={promoImage} alt="Мир веб-разработки" />
          </div>
          <a className="promo__learn-more" href="#about-project">Узнать больше</a>
        </MainContainer>
      </div>
    </section>
  )
}

export default Promo;
