import './InputError.css';

function InputError(props) {
  return <span className="error-message">{props.message}</span>;
}

export default InputError;
