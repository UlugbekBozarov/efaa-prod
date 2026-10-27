import { startQueueWorker } from "@/services";
import type { IZustandGet, IZustandSet } from "../app.store.type";
import { get as lodashGet } from "lodash";

import { configSync, configurationInitialized } from "../config";
import { currencyInitialized, currenciesSync } from "../currency";
import { employeeInitialized } from "../employee";
import { measureInitialized, measuresSync } from "../measure";
import { productsSync } from "../product";
import { queueInitialized } from "../queue";
import { warehouseInitialized, warehousesSync } from "../warehouse";
import { receiptSync } from "../receipt/receipt.sync";
import { metaInitialized } from "../meta";

export const initialInitialized = false;

export const initialLoading = false;
export const initialProgress = {
  section: "Loading...",
  value: 0,
};

export const progressSet =
  (set: IZustandSet) => async (section: string, progress: number) => {
    set({
      initialProgress: { section, value: Math.max(Math.min(progress, 100), 0) },
    });
  };

export const initializing = (set: IZustandSet) => async () => {
  try {
    await metaInitialized(set);
    await configurationInitialized(set);
    await currencyInitialized(set);
    await measureInitialized(set);
    await warehouseInitialized(set);
    await employeeInitialized(set);
    // await productInitialized(set);
    // await productCategoryInitialized(set);
    await queueInitialized(set);
    await set({
      initialized: false,
    });
  } catch (error) {
    console.log("initialized store exception: ", error);
  }
};

export const backendSync = (set: IZustandSet, get: IZustandGet) => async () => {
  try {
    const store = get();

    if (lodashGet(store, "meta.fullSyncNeeded", true)) {
      await set({
        initialLoading: true,
        initialProgress: {
          section: "Loading configuration...",
          value: 2,
        },
      });
    } else {
      await set({
        initialProgress: {
          section: "Loading configuration...",
          value: 2,
        },
      });
    }
    await configSync(set);
    await set({
      initialProgress: {
        section: "Loading receipt...",
        value: 4,
      },
    });
    await receiptSync(set);
    await set({
      initialProgress: {
        section: "Loading cashboxes...",
        value: 6,
      },
    });
    set({
      initialProgress: {
        section: "Loading currencies...",
        value: 8,
      },
    });
    await currenciesSync(set);
    await set({
      initialProgress: {
        section: "Loading payment methods...",
        value: 10,
      },
    });
    await set({
      initialProgress: {
        section: "Loading prices...",
        value: 12,
      },
    });
    await set({
      initialProgress: {
        section: "Loading warehouses...",
        value: 14,
      },
    });
    await warehousesSync(set);
    await set({
      initialProgress: {
        section: "Loading measure...",
        value: 16,
      },
    });
    await measuresSync(set);
    await set({
      initialProgress: {
        section: "Loading customers...",
        value: 20,
      },
    });
    await set({
      initialProgress: {
        section: "Loading product categories...",
        value: 30,
      },
    });
    await set({
      initialProgress: {
        section: "Loading products...",
        value: 40,
      },
    });
    await productsSync(set, 40, 60);

    await set({
      initialProgress: {
        section: "Loading finished.",
        value: 100,
      },
    });
    setTimeout(() => {
      set({
        initialLoading: false,
      });
      startQueueWorker();
    }, 300);
  } catch (error) {
    console.log("initialized store exception: ", error);
  }
};
