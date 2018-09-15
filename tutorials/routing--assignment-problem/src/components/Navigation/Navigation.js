import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const navigation = () => {
  return (
    <header className="Navigation">
      <nav>
        <ul>
          <li><NavLink to="/courses">courses</NavLink></li>
          <li><NavLink to="/users">users</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default navigation;