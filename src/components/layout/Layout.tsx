import React from 'react';

import Navbar from '../navbar/Navbar';

import '../../styles/layout.css';
import { useAppSelector } from '../../state/hooks';
import Loader from '../common/Loader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((s) => s.user.current);
  return (
    <div className="layout">
      <Navbar></Navbar>
      {user ? children : <Loader></Loader>}
    </div>
  );
}
