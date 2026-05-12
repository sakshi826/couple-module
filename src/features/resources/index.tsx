import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Suspense } from 'react';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import './index.css';

const UniversalResourceViewer = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/:id" element={<ResourceDetail />} />
      </Routes>
    </Suspense>
      </Suspense>
    </I18nextProvider>
  );
};

export default UniversalResourceViewer;
