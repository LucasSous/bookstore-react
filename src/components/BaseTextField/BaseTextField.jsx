import { FloatingLabel, Form } from 'react-bootstrap';

function BaseTextField(props) {
  return (
    <FloatingLabel controlId="floatingInput" label={props.label} className="mb-3">
      <Form.Control type="text" placeholder=".." onChange={(e) => props.onChange(e.target.value)} />
    </FloatingLabel>
  );
}

export default BaseTextField;
