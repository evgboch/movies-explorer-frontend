import './LoadingError.css'

function LoadingError(props) {
  return (
    <div className="loading-error">
      <h2 className="loading-error__title">{ props.children }</h2>
    </div>
  )
};

export default LoadingError;
