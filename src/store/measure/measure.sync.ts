import { get } from "lodash";

import { apiFetch } from "@/api/fetch/apiFetch";
import type { SyncResponse } from "@/types";
import { SyncMetaName } from "@/constants";

import type { IZustandSet } from "../app.store.type";
import type { IMeasure } from "./measure.type";

import { getMeasureLastUpdatedAt, measuresBulkPutDb } from "./measure.db";
import { setMetaData } from "../meta";

export const measuresSync = async (set: IZustandSet) => {
  try {
    setMetaData(
      SyncMetaName.measure,
      new Date().toISOString(),
      true,
      true,
      set,
    );
    const updatedAt = await getMeasureLastUpdatedAt();
    const { data, serverTime } = await apiFetch<SyncResponse<IMeasure[]>>(
      "units-of-measure/for-pos",
      {
        method: "GET",
        query: updatedAt
          ? { updatedAt: new Date(updatedAt).toString() }
          : undefined,
      },
    );

    const measures = await measuresBulkPutDb(data);

    const byDefault =
      (await measures).find((measure) => get(measure, "byDefault", false)) ||
      null;

    set({
      measure: {
        byDefault,
        data: measures,
        updatedAt: serverTime,
      },
    });
    setMetaData(SyncMetaName.measure, serverTime, false, false, set);
  } catch (error) {
    console.error("sync currencies error:", error);
    throw error;
  }
};
