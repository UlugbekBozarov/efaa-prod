import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PublicLayout from "@/layout/public/PublicLayout";
import { FallbackSuspense } from "@/components";

const NotFound = lazy(() => import("../../pages/404/NotFound"));

const AuthSignIn = lazy(() => import("../../pages/auth/AuthSignIn"));
// const AuthForgotPassword = lazy(() => import("../../pages/forgot/"));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<FallbackSuspense />}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<AuthSignIn />} />
          <Route path="forgot-password" element={<AuthSignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
