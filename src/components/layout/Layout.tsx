import React from 'react';
import Navbar from '../navbar/Navbar';

import '../../styles/layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
