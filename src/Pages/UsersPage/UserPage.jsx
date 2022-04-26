import './UserPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import UsersList from './List/UsersList.jsx';
import BaseButton from '../../components/BaseButton/BaseButton';
import { Col, Row } from 'react-bootstrap';
import BaseSearch from '../../components/BaseSearch/BaseSearch';
import FormModal from './FormModal/FormModal';

import UsersContextProvider from '../../contexts/usersContext';

function UserPage() {
  return (
    <div className="user-page">
      <UsersContextProvider>
        <Row>
          <Col>
            <BaseHeader title="Usuários" />
          </Col>
          <Col className="d-flex justify-content-end actions">
            <BaseSearch />
            <BaseButton title="Adicionar Usuário" />
          </Col>
        </Row>
        <UsersList />
        <FormModal />
      </UsersContextProvider>
    </div>
  );
}

export default UserPage;
