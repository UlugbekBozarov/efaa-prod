import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateLayout from "@/layout/private/PrivateLayout";
import { FallbackSuspense } from "@/components";

const NotFound = lazy(() => import("../../pages/404/NotFound"));

// const Desktop = lazy(() => import("../../pages/desktop/Desktop"));
// const Sales = lazy(() => import("../../pages/sales/Sales"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<FallbackSuspense />}>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
          {/* <Route index element={<Desktop key="sale-create" />} /> */}
          {/* <Route path="sales" element={<Sales />} /> */}
          {/* <Route path="edit/:saleId" element={<Desktop key="sale-edit" />} /> */}
          {/* <Route path="forgot-password" element={<AuthForgotPassword />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
