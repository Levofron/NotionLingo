import { SEO } from '@ui/atoms';
import { Dashboard as DashboardPage } from '@ui/pages';

const Dashboard = () => (
  <>
    <SEO noFollow noIndex title="Dashboard" />
    <DashboardPage />
  </>
);

export default Dashboard;
