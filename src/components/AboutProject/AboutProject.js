import "./AboutProject.css";
import MainContainer from "../MainContainer/MainContainer";
import SectionHeading from "../SectionHeading/SectionHeading";

function AboutProject() {
  return (
      <section className="about-project">
        <MainContainer>
          <SectionHeading>О&nbsp;проекте</SectionHeading>
          <div className="about-project__info">
            <div className="about-project__info-container">
              <h3 className="about-project__info-heading">Дипломный проект включал 5&nbsp;этапов</h3>
              <p className="about-project__info-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
            </div>
              <div className="about-project__info-container">
                <h3 className="about-project__info-heading">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
                <p className="about-project__info-paragraph">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
          </div>
          <div className="about-project__visualization">
            <div className="about-project__backend-container">
              <p className="about-project__chart about-project__chart-backend">1 неделя</p>
              <p className="about-project__title">Back-end</p>
            </div>
            <div className="about-project__frontend-container">
              <p className="about-project__chart about-project__chart-frontend">4 недели</p>
              <p className="about-project__title">Front-end</p>
            </div>
          </div>
          <div className="about-project__visualization">


          </div>
        </MainContainer>
      </section>
  )
}

export default AboutProject;
