import React, { lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import { useAppSelector } from './state/hooks';
import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Favorites from './pages/Favorites';

import './App.css';
import Loader from './components/common/Loader';

const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const user = useAppSelector((s) => s.user.current);
  const goto = useNavigate();

  React.useEffect(() => {
    if (!user) {
      localStorage.removeItem('accessToken');
      goto('/login');
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Home></Home>}></Route>
        <Route path="/signup" element={<Home></Home>}></Route>
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
