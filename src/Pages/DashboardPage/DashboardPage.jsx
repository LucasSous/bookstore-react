import './DashboardPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import Charts from './Charts/Charts';
import Cards from './Cards/Cards';
import RentsList from './RentsList/RentsList';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

function DashboardPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'dashboard-page' : 'dashboard-page-menuOff'}`}>
      <BaseHeader title="Dashboard" />
      <Cards />
      <Charts />
      <RentsList />
    </div>
  );
}

export default DashboardPage;
