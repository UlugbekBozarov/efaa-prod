import { useEffect, useState } from "react";
import { get } from "lodash";

import { initVisitorId } from "@/core/fingerprint";
// import { useAppStore } from "@/store/app.store";
// import type { IUser } from "@/store/user";
import { apiFetch } from "@/api/fetch/apiFetch";

export type AppState = {
  isAuthenticated: boolean;
  loading: boolean;
};

export type AppActions = {
  toggleMode: () => void;
  setAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
};

export type IIndexedDbConfig = {
  version: number;
  forceReInit: boolean;
};

const useApp = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await apiFetch("auth/logout", {
      method: "GET",
    }).then(async () => {
      window.location.href = "/";
      await setAuthenticated(false);
    });
  };

  useEffect(() => {
    // const onOnline = () => useAppStore.getState().setIsOnline(true);
    // const onOffline = () => useAppStore.getState().setIsOnline(false);

    const checkAuth = async () => {
      try {
        await initVisitorId();
        await apiFetch(`auth/for-pos/me`).then(async (response) => {
          // await useAppStore.getState().userSet(response);
          localStorage.setItem("deviceName", get(response, "deviceName", ""));
          localStorage.setItem("deviceId", get(response, "deviceId", ""));
        });
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // window.addEventListener("online", onOnline);
    // window.addEventListener("offline", onOffline);

    checkAuth();

    // return () => {
    //   window.removeEventListener("online", onOnline);
    //   window.removeEventListener("offline", onOffline);
    // };
  }, []);

  return {
    state: {
      isAuthenticated,
      loading,
    },
    actions: {
      setAuthenticated,
      logout,
    },
  };
};

export type UseAppType = ReturnType<typeof useApp>;

export default useApp;
