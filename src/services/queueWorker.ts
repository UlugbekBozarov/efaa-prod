import { get } from "lodash";

import { useAppStore } from "@/store/app.store";
import { db } from "@/store/db";

import { dispatchSync } from "./dispatchSync";

let workerRunning = false;

export async function startQueueWorker() {
  if (workerRunning) return;
  workerRunning = true;

  try {
    while (true) {
      const { isOnline, sync } = useAppStore.getState();
      if (!isOnline || sync === "pause") break;

      const nextQueue = await db.queues
        .where("status")
        .anyOf(["pending", "networkError"])
        .sortBy("createdAt")
        .then((arr) => arr[0]);

      if (!nextQueue) break;

      await useAppStore.getState().queueUpdateProcessing(get(nextQueue, "id"));

      try {
        await dispatchSync(nextQueue);
      } catch {
        // error handled inside
      }
    }
  } finally {
    workerRunning = false;
  }
}
