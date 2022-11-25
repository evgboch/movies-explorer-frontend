import "./Error.css";
import { useHistory } from "react-router-dom";

function Error() {
  const history = useHistory();

  function handleBackClick() {
    history.goBack()
  }

  return(
    <div className="error">
      <p className="error__status">404</p>
      <p className="error__message">Страница не найдена</p>
      <button className="error__button" onMouseDown={ handleBackClick }>Назад</button>
    </div>
  )
}

export default Error;
