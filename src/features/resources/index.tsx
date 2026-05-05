import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import './index.css';

const UniversalResourceViewer = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/:id" element={<ResourceDetail />} />
      </Routes>
    </Suspense>
  );
};

export default UniversalResourceViewer;
