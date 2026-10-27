import { startQueueWorker } from "@/services";
import { get } from "lodash";

import type { IZustandSet } from "../app.store.type";

export const initialIsOnline = navigator.onLine;

export const setIsOnline = (set: IZustandSet) => async (isOnline: boolean) => {
  await set((state) => {
    if (isOnline && get(state, "initialized") && get(state, "initialLoading")) {
      if (isOnline) {
        startQueueWorker();
      }
    }
    return { isOnline };
  });
};
