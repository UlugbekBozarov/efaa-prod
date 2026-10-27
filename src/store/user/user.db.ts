import type { IUser } from "./user.type";
import { db } from "../db";

export async function userWriteDb(user: IUser) {
  await db.user.clear();
  await db.user.add(user);
}

export async function getUserDb(): Promise<IUser | null> {
  return (await db.user.toCollection().first()) ?? null;
}

export async function userClearDb() {
  await db.user.clear();
}
