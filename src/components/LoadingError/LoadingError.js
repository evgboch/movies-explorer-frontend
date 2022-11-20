import './LoadingError.css'

const LoadingError = () => {
    return (
        <div className="loading-error">
            <h2 className="loading-error__title">Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз</h2>
        </div>
    )
};

export default LoadingError;
