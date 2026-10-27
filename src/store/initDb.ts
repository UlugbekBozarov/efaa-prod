import { db } from "./db";

type InitDbParams = {
  version: number;
  forceReInit: boolean;
};

export const initDb = async ({ version, forceReInit }: InitDbParams) => {
  const currentVersion = db.verno;

  if (forceReInit) {
    await db.delete();
  }

  if (!db.isOpen() || currentVersion !== version) {
    await db.open();
  }
};
