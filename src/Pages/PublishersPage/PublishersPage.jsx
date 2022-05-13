import './PublishersPage.css';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';
import PublishersList from './List/PublishersList';
import PublishersContextProvider from '../../contexts/publishersContext';

function PublishersPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'publishers-page' : 'publishers-page-menuOff'}`}>
      <PublishersContextProvider>
        <PublishersList />
      </PublishersContextProvider>
    </div>
  );
}

export default PublishersPage;
