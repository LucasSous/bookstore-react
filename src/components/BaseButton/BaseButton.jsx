import { Button } from 'react-bootstrap';

function BaseButton({title}) {
    return(
        <Button variant="success">{title}</Button>
    )
}

export default BaseButton;