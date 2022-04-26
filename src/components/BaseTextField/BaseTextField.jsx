import { FloatingLabel, Form } from 'react-bootstrap';

function BaseTextField(props) {
  return (
    <FloatingLabel controlId="floatingInput" label={props.label} className="mb-3">
      <Form.Control type="text" placeholder=".." value={props.value} onChange={props.onChange} />
    </FloatingLabel>
  );
}

export default BaseTextField;
