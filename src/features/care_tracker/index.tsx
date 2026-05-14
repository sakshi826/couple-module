import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { PremiumLayout } from '../../components/shared/PremiumLayout';
import './index.css';
import './i18n';
import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "./components/AuthProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const App = () => {
  const { i18n: globalI18n } = useTranslation();
  
  React.useEffect(() => {
    if (globalI18n.language && globalI18n.language !== i18n.language) {
      i18n.changeLanguage(globalI18n.language);
    }
  }, [globalI18n.language]);

  const { t } = useTranslation();
  return (
(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </I18nextProvider>
    </TooltipProvider>
  </QueryClientProvider>
)
  );
};


export default App;
