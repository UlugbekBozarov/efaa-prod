// import { startQueueWorker } from "@/services";
import type { IZustandSet } from "../app.store.type";

export const initialSync = "play";

export const onSyncPlay = (set: IZustandSet) => async () => {
  await set({
    sync: "play",
  });
  // startQueueWorker();
};

export const onSyncPause = (set: IZustandSet) => async () => {
  await set({
    sync: "pause",
  });
};
