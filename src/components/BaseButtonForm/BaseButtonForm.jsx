import { Button } from 'react-bootstrap';
import './BaseButtonForm.css';

function BaseButtonForm(props) {
  return (
    <Button variant="ligth" onClick={props.click}>
      <span className={props.color}>{props.title}</span>
    </Button>
  );
}

export default BaseButtonForm;
