import './DashboardPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import Charts from './Charts/Charts';
import Cards from './Cards/Cards';
import RentsList from './RentsList/RentsList';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <BaseHeader title="Dashboard" />
      <Cards />
      <Charts />
      <RentsList />
    </div>
  );
}

export default DashboardPage;
