import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-medium">
          Your calorie tracker
        </NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;
