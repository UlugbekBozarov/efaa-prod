import { get } from "lodash";

import { userClearDb, userWriteDb } from "./user.db";
import type { IZustandSet } from "../app.store.type";
import type { IUser } from "./user.type";

export const initialUser = null;
export const initialDevice = null;

export const userSet = (set: IZustandSet) => async (user: IUser) => {
  await set((state) => ({
    user,
    device: {
      id: get(user, "deviceId"),
      deviceId: get(user, "deviceId"),
      serialNumber: get(user, "deviceSerialNumber"),
      name: get(user, "deviceName"),
    },
    localSerialNumber: Math.max(
      get(user, "localSerialNumber", 10000) + 1,
      get(state, "localSerialNumber", 10000),
    ),
  }));
  await userWriteDb(user);
};

export const userDelete = (set: IZustandSet) => async () => {
  set({ user: null });
  await userClearDb();
};
