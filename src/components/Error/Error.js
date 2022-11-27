import "./Error.css";
import { useHistory } from "react-router-dom";
import { ERROR_STATUSES, ERROR_MESSAGES } from "../../utils/constants";

function Error() {
  const history = useHistory();

  function handleBackClick() {
    history.goBack()
  }

  return(
    <div className="error">
      <p className="error__status">{ ERROR_STATUSES.notFound }</p>
      <p className="error__message">{ ERROR_MESSAGES.notFound }</p>
      <button className="error__button" onMouseDown={ handleBackClick }>Назад</button>
    </div>
  )
}

export default Error;
