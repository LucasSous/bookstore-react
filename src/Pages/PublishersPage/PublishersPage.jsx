import './PublishersPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import React, { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

function PublishersPage() {
  const { isActiveMenu } = useContext(MenuContext);

  return (
    <div className={`${isActiveMenu ? 'publishers-page' : 'publishers-page-menuOff'}`}>
      <BaseHeader title="Editoras" />
    </div>
  );
}

export default PublishersPage;
