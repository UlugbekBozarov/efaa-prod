import { get } from "lodash";

import type { IMeasure } from "./measure.type";
import { db } from "../db";

export async function getMeasureLastUpdatedAt() {
  const lastUpdatedMeasure = await db.measures.orderBy("updatedAt").last();
  return get(lastUpdatedMeasure, "updatedAt", null);
}

export async function getAllMeasures() {
  return await db.measures.orderBy("createdAt").toArray();
}

export async function measurePutDb(measure: IMeasure) {
  await db.measures.put(measure);

  return await db.measures.orderBy("createdAt").toArray();
}

export async function measuresBulkPutDb(measures: IMeasure[]) {
  await db.measures.bulkPut(measures);

  return await db.measures.orderBy("createdAt").toArray();
}
