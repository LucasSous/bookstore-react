import './DashboardPage.css';
import BaseHeader from '../../components/BaseHeader/BaseHeader.jsx';
import Charts from './Charts/Charts';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <BaseHeader title="Dashboard" />
      <Charts />
    </div>
  );
}

export default DashboardPage;
