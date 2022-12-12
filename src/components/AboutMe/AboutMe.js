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
              <p className="about-me__bio">Я&nbsp;родился в&nbsp;городе Курчатов, после школы переехал в&nbsp;Москву. Окончил МГТУ им. Н.Э. Баумана. Работая it-аудитором, параллельно увлекся веб-разработкой и&nbsp;окончил курсы Яндекс Практикума. Кроме разработки увлекаюсь автомобилестроением и&nbsp;темой гражданской авиации. Также в&nbsp;свободное время осваиваю искусство сноубординга. Когда свободного времени особенно много, пересматриваю Револьвер в&nbsp;поисках новых смыслов.</p>
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
