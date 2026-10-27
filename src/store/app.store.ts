import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IAppStore } from "./app.store.type";
import { userSet, userDelete, initialUser, initialDevice } from "./user";
import {
  initialSerialNumber,
  localSerialNumberInitialSet,
  localSerialNumberSet,
} from "./localSerialNumber";
import { initialType, initialMode, initialShortcuts } from "./config";
import { typeSet, changeMode, shortcutsSet } from "./config";
import { currencySet, initialCurrency } from "./currency";
import { employeeSet, initialEmployee } from "./employee";
import { initialMeasure, measureSet } from "./measure";
import { initialWarehouse, warehouseSet } from "./warehouse";
import { initialIsOnline, setIsOnline } from "./isOnline/isOnline.store";
import {
  backendSync,
  initialInitialized,
  initializing,
  initialLoading,
  initialProgress,
} from "./initial";
import {
  initialQueue,
  queueUpdateProcessing,
  queueUpdateDone,
  queueUpdateError,
} from "./queue";
import { initialSync, onSyncPlay, onSyncPause } from "./sync";
import { initialReceipt } from "./receipt/receipt.store";
import { productSet } from "./product";
import { initialMeta } from "./meta";

/* =========================
   Zustand Store
========================= */
export const useAppStore = create<IAppStore>()(
  persist(
    (set, get) => ({
      initialized: initialInitialized,

      initialLoading: initialLoading,
      initialProgress: initialProgress,

      meta: initialMeta,

      isOnline: initialIsOnline,
      setIsOnline: setIsOnline(set),

      user: initialUser,
      device: initialDevice,
      userSet: userSet(set),
      userDelete: userDelete(set),

      localSerialNumber: initialSerialNumber,
      localSerialNumberInitialSet: localSerialNumberInitialSet(set),
      localSerialNumberSet: localSerialNumberSet(set),

      type: initialType,
      typeSet: typeSet(set),
      mode: initialMode,
      changeMode: changeMode(set),
      shortcuts: initialShortcuts,
      shortcutsSet: shortcutsSet(set),
      receipt: initialReceipt,

      currency: initialCurrency,
      currencySet: currencySet(set),

      employee: initialEmployee,
      employeeSet: employeeSet(set),

      measure: initialMeasure,
      measureSet: measureSet(set),

      productSet: productSet,

      warehouse: initialWarehouse,
      warehouseSet: warehouseSet(set),

      initializing: initializing(set),
      backendSync: backendSync(set, get),

      // Advanced
      sync: initialSync,
      onPlay: onSyncPlay(set),
      onPause: onSyncPause(set),
      queue: initialQueue,
      queueUpdateProcessing: queueUpdateProcessing(set),
      queueUpdateDone: queueUpdateDone(set),
      queueUpdateError: queueUpdateError(set),
    }),
    {
      name: "pos-app-store",
      partialize: () => ({
        initialized: true,
      }),
    },
  ),
);
