import { useGlobalContext } from "@/hooks";

import { FallbackSuspense } from "@/components";

import PrivateRoutes from "./private/PrivateRoutes";
import PublicRoutes from "./public/PublicRoutes";

const Routes = () => {
  const {
    state: { isAuthenticated, loading },
  } = useGlobalContext();

  if (loading) return <FallbackSuspense />;

  if (isAuthenticated) return <PrivateRoutes />;

  return <PublicRoutes />;
};

export default Routes;
