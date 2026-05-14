import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Suspense } from 'react';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import './index.css';
import { useTranslation } from "react-i18next";

const UniversalResourceViewer = () => {
    const { i18n: globalI18n } = useTranslation();
  
  React.useEffect(() => {
    if (globalI18n.language && globalI18n.language !== i18n.language) {
      i18n.changeLanguage(globalI18n.language);
    }
  }, [globalI18n.language]);

  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={null}>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">{(typeof t !== "undefined" ? t : (k) => k)("common.loading")}</div>}>
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
