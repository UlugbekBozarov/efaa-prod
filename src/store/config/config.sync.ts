import { get } from "lodash";

import { apiFetch } from "@/api/fetch/apiFetch";
import type { SyncResponse } from "@/types";
import { SyncMetaName } from "@/constants";

import type { IAppConfigResponse, IShortcut } from "./config.type";
import type { IZustandSet } from "../app.store.type";
import { shortcutsBulkPutDb } from "./config.db";
import { setMetaData } from "../meta";

export const configSync = async (set: IZustandSet) => {
  try {
    setMetaData(
      SyncMetaName.configuration,
      new Date().toISOString(),
      true,
      true,
      set,
    );
    const {
      serverTime,
      data: { type, mode, shortcuts, paymentMethodShortcuts },
    } = await apiFetch<SyncResponse<IAppConfigResponse>>("pos/settings/form", {
      method: "GET",
    });

    await set({
      type,
      mode,
    });

    const dbShortcuts = await shortcutsBulkPutDb([
      ...shortcuts,
      ...paymentMethodShortcuts,
    ]);

    const storeShortcut: Record<string, IShortcut> = await dbShortcuts.reduce(
      (all, shortcut) => {
        return { ...all, [get(shortcut, "id")]: shortcut };
      },
      {},
    );

    await set({
      shortcuts: storeShortcut,
    });

    setMetaData(SyncMetaName.configuration, serverTime, false, false, set);
  } catch (error) {
    console.log("Cashbox initialized store exception: ", error);
  }
};
