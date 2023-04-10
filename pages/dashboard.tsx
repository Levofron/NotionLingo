import { SEO } from '@presentation/atoms';
import { Dashboard as DashboardPage } from '@presentation/pages';

const Dashboard = () => (
  <>
    <SEO noFollow noIndex title="Dashboard" />
    <DashboardPage />
  </>
);

export default Dashboard;
