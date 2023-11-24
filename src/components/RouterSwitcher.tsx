import { Route, Routes} from 'react-router-dom';
import NotFound from './NotFound';
import DashboardPage from './DashboardPage';
import SearchPage from './SearchPage';
import LandingPage from './LandingPage';

export default function RouterSwitcher() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

