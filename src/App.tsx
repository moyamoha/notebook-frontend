import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

import { useAppSelector } from './state/hooks';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notebook from './pages/Notebook';
import Favorites from './pages/Favorites';

import './App.css';

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
        <Route
          path="/"
          element={user ? <Home></Home> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/login"
          element={user ? <Home></Home> : <Login></Login>}
        ></Route>
        <Route
          path="/signup"
          element={user ? <Home></Home> : <Signup></Signup>}
        ></Route>
        <Route
          path="/favorites"
          element={user ? <Favorites></Favorites> : <Login></Login>}
        ></Route>
        <Route
          path="/settings"
          element={
            user ? (
              <Suspense fallback={'loading...'}>
                <Settings></Settings>
              </Suspense>
            ) : (
              <Login></Login>
            )
          }
        ></Route>
        <Route
          path="/:nb_name"
          element={
            user ? <Notebook></Notebook> : <Navigate to="/login"></Navigate>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
