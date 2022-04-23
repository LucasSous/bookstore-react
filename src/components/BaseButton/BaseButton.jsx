import { Button } from 'react-bootstrap';

function BaseButton(props) {
  return (
    <Button onClick={props.click} variant="success">
      {props.title}
    </Button>
  );
}

export default BaseButton;
