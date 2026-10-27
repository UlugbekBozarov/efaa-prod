import { db } from "../db";
import type { IShortcut } from "./config.type";

export async function shortcutsBulkPutDb(shortcuts: IShortcut[]) {
  await db.shortcuts.bulkPut(shortcuts);

  return await db.shortcuts.toArray();
}
