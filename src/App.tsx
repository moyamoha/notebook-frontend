import React, { lazy, Suspense } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router';

import {
  useAppDispatch,
  useAppSelector,
  useRouteQueryHandler,
} from './state/hooks';
import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Favorites from './pages/Favorites';

import './App.css';
import Loader from './components/common/Loader';
import { AUTH_URL, SITE_URL } from './utils/constants';
import { useSearchParams } from 'react-router-dom';
import { login, logout } from './state/api/user.api';

const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const user = useAppSelector((s) => s.user.current);
  useRouteQueryHandler();
  React.useEffect(() => {
    if (!user) {
      localStorage.removeItem('accessToken');
      window.location.href = `${AUTH_URL}/login?redirect=${SITE_URL}`;
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        <Route
          path="/settings"
          element={
            <Suspense fallback={<Loader></Loader>}>
              <Settings></Settings>
            </Suspense>
          }
        ></Route>
        <Route path="/:nb_name" element={<Notebook></Notebook>}></Route>
      </Routes>
    </div>
  );
}

export default App;
