import { get } from "lodash";

import type { IZustandSet } from "../app.store.type";
import { getMetaData, setDbMetaData } from "./meta.db";

export const initialMeta = {
  firstSync: null,
  firstSyncAt: null,
  lastSync: null,
  lastSyncAt: null,
  data: [],
  fullSyncNeeded: true,
};

export const metaInitialized = async (set: IZustandSet) => {
  try {
    const { firstSync, lastSync, data, fullSyncNeeded } = await getMetaData();

    set({
      meta: {
        firstSync: firstSync || null,
        firstSyncAt: get(firstSync, "lastSyncAt", null),
        lastSync: lastSync || null,
        lastSyncAt: get(lastSync, "lastSyncAt", null),
        data: data,
        fullSyncNeeded,
      },
    });
  } catch (error) {
    console.log("Measure initialized store exception: ", error);
  }
};

export const setMetaData = async (
  id: string,
  lastSyncAt: string,
  syncing: boolean,
  fullSyncNeeded: boolean,
  set: IZustandSet,
) => {
  try {
    const { firstSync, lastSync, data } = await setDbMetaData({
      id,
      lastSyncAt,
      syncing,
      fullSyncNeeded,
    });

    set({
      meta: {
        firstSync: firstSync || null,
        firstSyncAt: get(firstSync, "lastSyncAt", null),
        lastSync: lastSync || null,
        lastSyncAt: get(lastSync, "lastSyncAt", null),
        data: data,
        fullSyncNeeded: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
