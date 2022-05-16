import './RentsPage.css';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';
import RentsList from './List/RentsList';
import RentsContextProvider from '../../contexts/rentsContext';

function RentsPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'rents-page' : 'rents-page-menuOff'}`}>
      <RentsContextProvider>
        <RentsList />
      </RentsContextProvider>
    </div>
  );
}

export default RentsPage;
