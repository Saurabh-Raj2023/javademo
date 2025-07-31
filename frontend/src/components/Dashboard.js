import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Link to="/admin/products">Manage Products</Link>
    </div>
  );
};

export default Dashboard;
