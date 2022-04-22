import './UserPage.css'
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import UsersList from './List/UsersList.js';
import BaseButton from '../../components/BaseButton/BaseButton';
import { Col, Row } from 'react-bootstrap';
import BaseSearch from '../../components/BaseSearch/BaseSearch';

function UserPage() {

    return(
        <div className="user-page">
            <Row>
                <Col>
                    <BaseHeader title="Usuários"/>
                </Col>
                <Col className='d-flex justify-content-end actions'>
                    <BaseSearch />
                    <BaseButton title="Adicionar Usuário"/>
                </Col>
            </Row>     
            <UsersList/>
        </div>
    )

}

export default UserPage;