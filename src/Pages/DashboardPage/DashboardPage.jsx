import './DashboardPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import Charts from './Charts/Charts';
import Cards from './Cards/Cards';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <BaseHeader title="Dashboard" />
      <Cards />
      <Charts />
    </div>
  );
}

export default DashboardPage;
