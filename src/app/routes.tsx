import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SelfCareResources } from "./components/SelfCareResources";
import { StaticContentViewer } from "../components/StaticContentViewer";
import { AuthGuard } from "../components/AuthGuard";
import { useTranslation } from "react-i18next";

// Dynamic Imports
const ALetterToSelf = React.lazy(() => import("../features/a_letter_to_self"));
const Affirmations = React.lazy(() => import("../features/affirmations"));
const DiffusionTechnique = React.lazy(() => import("../features/diffusion_technique"));
const KnowYourValues = React.lazy(() => import("../features/know_your_values"));
const GratitudeTracker = React.lazy(() => import("../features/gratitude_tracker"));
const CareTracker = React.lazy(() => import("../features/care_tracker"));
const PersonalMissionStatement = React.lazy(() => import("../features/personal_mission_statement"));
const Resources = React.lazy(() => import("../features/resources"));
const GuidedSeries = React.lazy(() => import("./pages/GuidedSeries"));
const GuidedActivity = React.lazy(() => import("./pages/GuidedActivity"));
const RelationshipPatternsUnpacked = React.lazy(() => import("../features/relationship_patterns_unpacked"));
const RedrawYourCircle = React.lazy(() => import("../features/redraw_your_circle"));
const WhatDoINeed = React.lazy(() => import("../features/what_do_i_need"));
const TheUnsentLetter = React.lazy(() => import("../features/the_unsent_letter"));
const RepairAndReconnect = React.lazy(() => import("../features/repair_and_reconnect"));
const APauseForAppreciation = React.lazy(() => import("../features/a_pause_for_appreciation"));
const VibeTracker = React.lazy(() => import("../features/vibe_tracker"));

function ProtectedLayout() {
  const { t } = useTranslation();
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

import { TopLoader } from "../components/TopLoader";

const LoadingFallback = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
      <TopLoader />
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-hidden="true"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {(typeof t !== "undefined" ? t : (k) => k)("loading")}
        </p>
      </div>
    </div>
  );
};

const withLoading = (element: React.ReactNode) => <Suspense fallback={<LoadingFallback />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SelfCareResources /> },
      { path: "topics/:topicId", element: <SelfCareResources /> },
      { path: "guided-series/:concern", element: withLoading(<GuidedSeries />) },
      { path: "guided-series/:concern/:activityName", element: withLoading(<GuidedActivity />) },
      { path: "concerns/:concern/:type", element: <StaticContentViewer /> },

      {
        element: <ProtectedLayout />,
        children: [
          { path: "tools/a-letter-to-self/*", element: withLoading(<ALetterToSelf />) },
          { path: "tools/affirmations/*", element: withLoading(<Affirmations />) },
          { path: "exercises/diffusion-technique/*", element: withLoading(<DiffusionTechnique />) },
          { path: "tools/know-your-values/*", element: withLoading(<KnowYourValues />) },
          { path: "trackers/gratitude-tracker/*", element: withLoading(<GratitudeTracker />) },
          { path: "trackers/care-tracker/*", element: withLoading(<CareTracker />) },
          { path: "tools/personal-mission-statement/*", element: withLoading(<PersonalMissionStatement />) },
          { path: "resources/:concern/:type/*", element: withLoading(<Resources />) },
          { path: "tools/relationship-patterns-unpacked/*", element: withLoading(<RelationshipPatternsUnpacked />) },
          { path: "tools/redraw-your-circle/*", element: withLoading(<RedrawYourCircle />) },
          { path: "tools/what-do-i-need/*", element: withLoading(<WhatDoINeed />) },
          { path: "tools/the-unsent-letter/*", element: withLoading(<TheUnsentLetter />) },
          { path: "tools/repair-and-reconnect/*", element: withLoading(<RepairAndReconnect />) },
          { path: "trackers/a-pause-for-appreciation/*", element: withLoading(<APauseForAppreciation />) },
          { path: "trackers/vibe-tracker/*", element: withLoading(<VibeTracker />) }
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ]
  }
], { basename: "/couple_module" });
