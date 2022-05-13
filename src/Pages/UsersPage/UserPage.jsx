import './UserPage.css';
import UsersList from './List/UsersList.jsx';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

import UsersContextProvider from '../../contexts/usersContext';

function UserPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'user-page' : 'user-page-menuOff'}`}>
      <UsersContextProvider>
        <UsersList />
      </UsersContextProvider>
    </div>
  );
}

export default UserPage;
