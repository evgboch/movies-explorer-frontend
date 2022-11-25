import "./Techs.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import MainContainer from "../MainContainer/MainContainer";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <MainContainer>
          <SectionHeading>Технологии</SectionHeading>
          <div className="techs__info">
            <h3 className="techs__info-heading">7 технологий</h3>
            <p className="techs__info-capture">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
            <div className="techs__stack">
              <p className="techs__icon">HTML</p>
              <p className="techs__icon">CSS</p>
              <p className="techs__icon">JS</p>
              <p className="techs__icon">React</p>
              <p className="techs__icon">Git</p>
              <p className="techs__icon">Express.js</p>
              <p className="techs__icon">mongoDB</p>
            </div>
          </div>
        </MainContainer>
      </div>
    </section>
  )
}

export default Techs;
