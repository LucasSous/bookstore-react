import { FloatingLabel, Form } from 'react-bootstrap';

function BaseTextField(params) {
  return (
    <FloatingLabel controlId="floatingInput" label={params.label} className="mb-3">
      <Form.Control type="text" placeholder="name@example.com" />
    </FloatingLabel>
  );
}

export default BaseTextField;
