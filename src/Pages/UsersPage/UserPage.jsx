import './UserPage.css';
import UsersList from './List/UsersList.jsx';

import UsersContextProvider from '../../contexts/usersContext';

function UserPage() {
  return (
    <div className="user-page">
      <UsersContextProvider>
        <UsersList />
      </UsersContextProvider>
    </div>
  );
}

export default UserPage;
