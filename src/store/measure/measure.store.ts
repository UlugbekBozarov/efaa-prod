import { get } from "lodash";

import {
  getAllMeasures,
  getMeasureLastUpdatedAt,
  measurePutDb,
} from "./measure.db";
import type { IMeasure } from "./measure.type";

import type { IAppStore, IZustandSet } from "../app.store.type";

export const initialMeasure = {
  byDefault: null,
  data: [],
  updatedAt: null,
};

export const measureInitialized = async (set: IZustandSet) => {
  try {
    const lastUpdatedAt = await getMeasureLastUpdatedAt();

    const measures = await getAllMeasures();

    const byDefault =
      (await measures).find((measure) => get(measure, "byDefault", false)) ||
      null;

    set({
      measure: {
        byDefault,
        data: measures,
        updatedAt: lastUpdatedAt,
      },
    });
  } catch (error) {
    console.log("Measure initialized store exception: ", error);
  }
};

export const measureSet = (set: IZustandSet) => async (measure: IMeasure) => {
  const measures = await measurePutDb(measure);

  const byDefault =
    (await measures).find((measure) => get(measure, "byDefault", false)) ||
    null;

  set((state: IAppStore) => {
    return {
      measure: {
        ...state.measure,
        byDefault,
        data: measures,
      },
    };
  });

  await measurePutDb(measure);
};
