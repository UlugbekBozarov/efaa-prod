import { get } from "lodash";
import type { IAppType } from "@/types";

import type { IAppStore, IZustandSet } from "../app.store.type";
import type { IShortcut } from "./config.type";
import { db } from "../db";

export const initialType = "desktop";
export const initialMode = "light";
export const initialShortcuts = null;

export const configurationInitialized = async (set: IZustandSet) => {
  const sale = await db.sales.orderBy("localSerialNumber").last();
  const saleMaxLocalSerialNumber = get(sale, "localSerialNumber", 10000);
  const user = await db.user.orderBy("id").first();
  const userMaxLocalSerialNumber = get(user, "localSerialNumber", 10000);

  const dbShortcuts = await db.shortcuts.toArray();
  const storeShortcut: Record<string, IShortcut> = await dbShortcuts.reduce(
    (all, shortcut) => {
      return { ...all, [get(shortcut, "id")]: shortcut };
    },
    {},
  );

  await set({
    localSerialNumber: Math.max(
      saleMaxLocalSerialNumber + 1,
      userMaxLocalSerialNumber + 1,
    ),
    shortcuts: storeShortcut,
  });
};

export const typeSet = (set: IZustandSet) => async (type: IAppType) => {
  set({ type });
};

export const changeMode = (set: IZustandSet) => async () => {
  set((state: IAppStore) => {
    if (state.mode === "light") return { mode: "dark" };
    else return { mode: "light" };
  });
};

export const shortcutsSet =
  (set: IZustandSet) => async (shortcuts: Record<string, IShortcut>) => {
    set({ shortcuts });
  };
