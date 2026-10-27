import { SyncMetaName } from "@/constants";
import { db } from "../db";
import type { IMeta } from "./meta.type";

export async function getMetaData() {
  const [firstSync, lastSync, data] = await Promise.all([
    db.meta.orderBy("lastSyncAt").first(),
    db.meta.orderBy("lastSyncAt").last(),
    db.meta.toArray(),
  ]);

  const metaMap = new Map(data.map((m) => [m.id, m]));

  const fullSyncNeeded = Object.values(SyncMetaName).some((name) => {
    const meta = metaMap.get(name);

    if (!meta) return true;

    return meta.fullSyncNeeded;
  });

  return { firstSync, lastSync, data, fullSyncNeeded };
}

export async function setDbMetaData(meta: IMeta) {
  await db.meta.put(meta);

  const [firstSync, lastSync, data] = await Promise.all([
    db.meta.orderBy("lastSyncAt").first(),
    db.meta.orderBy("lastSyncAt").last(),
    db.meta.toArray(),
  ]);

  return { firstSync, lastSync, data };
}
