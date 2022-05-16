import './DashboardPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import Charts from './Charts/Charts';
import Cards from './Cards/Cards';
import RentsList from './RentsList/RentsList';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';
import ButtonSettings from '../../components/ButtonSettings/ButtonSettings';

function DashboardPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'dashboard-page' : 'dashboard-page-menuOff'}`}>
      <div className="d-flex justify-content-between align-items-center">
        <BaseHeader title="Dashboard" />
        <ButtonSettings />
      </div>
      <Cards />
      <Charts />
      <RentsList />
    </div>
  );
}

export default DashboardPage;
