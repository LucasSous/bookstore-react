import './RentsPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

function RentsPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'rents-page' : 'rents-page-menuOff'}`}>
      <BaseHeader title="Aluguéis" />
    </div>
  );
}

export default RentsPage;
