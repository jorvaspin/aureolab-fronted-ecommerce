import React from 'react';
import Dashboard from '../components/Dashboard';
import MainLayout from '../components/MainLayout';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="pt-20">
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;