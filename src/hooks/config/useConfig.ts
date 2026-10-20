import { useCallback } from "react";

// import { useAppStore } from "@/store/app.store";

const useConfig = () => {
  // const isOnline = useAppStore((state) => state.isOnline);
  // const initialized = useAppStore((state) => state.initialized);
  // const initialLoading = useAppStore((state) => state.initialLoading);
  // const initialProgress = useAppStore((state) => state.initialProgress);
  // const type = useAppStore((state) => state.type);
  // const mode = useAppStore((state) => state.mode);
  // const device = useAppStore((state) => state.device);
  // const shortcuts = useAppStore((state) => state.shortcuts);

  const onChangeMode = useCallback(() => {
    // useAppStore.getState().changeMode();
  }, []);

  return {
    // initialized,
    // isOnline,
    // initialLoading,
    // initialProgress,
    // device,
    // type,
    // mode,
    // shortcuts,
    onChangeMode,
  };
};

export default useConfig;
