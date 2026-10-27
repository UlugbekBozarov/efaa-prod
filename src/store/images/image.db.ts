import { db } from "../db";

export async function getImage(id: string) {
  return await db.images.get(id);
}

export async function imagePutDb(id: string, blob: Blob) {
  await db.images.put({ id, blob });

  return await db.images.get(id);
}
