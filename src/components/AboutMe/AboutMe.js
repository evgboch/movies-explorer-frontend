import "./AboutMe.css";
import MainContainer from "../MainContainer/MainContainer";
import SectionHeading from "../SectionHeading/SectionHeading";
import Portfolio from "../Portfolio/Portfolio";
import myPhoto from "../../images/my-photo.jpeg";

function AboutMe() {
  return (
      <section className="about-me">
        <MainContainer>
          <SectionHeading>Студент</SectionHeading>
          <div className="about-me__info">
            <div className="about-me__text">
              <h3 className="about-me__name">Евгений</h3>
              <p className="about-me__capture">Фронтенд-разработчик, 28&nbsp;лет</p>
              <p className="about-me__bio">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
              <a className="about-me__link" href="https://github.com/evgboch" target="_blank" rel="noreferrer">Github</a>
            </div>
            <img className="about-me__photo" src={ myPhoto } alt="Фото разработчика" ></img>
          </div>
          <Portfolio />
        </MainContainer>
      </section>
  )
}

export default AboutMe;
