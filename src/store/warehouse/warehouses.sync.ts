import { get } from "lodash";

import { apiFetch } from "@/api/fetch/apiFetch";
import type { SyncResponse } from "@/types";
import { SyncMetaName } from "@/constants";

import { getWarehouseLastUpdatedAt, warehousesBulkPutDb } from "./warehouse.db";
import type { IZustandSet } from "../app.store.type";
import type { IWarehouse } from "./warehouse.type";
import { setMetaData } from "../meta";

export const warehousesSync = async (set: IZustandSet) => {
  try {
    setMetaData(
      SyncMetaName.warehouse,
      new Date().toISOString(),
      true,
      true,
      set,
    );
    const updatedAt = await getWarehouseLastUpdatedAt();
    const { data, serverTime } = await apiFetch<SyncResponse<IWarehouse[]>>(
      "warehouses/for-pos",
      {
        method: "GET",
        query: updatedAt
          ? { updatedAt: new Date(updatedAt).toString() }
          : undefined,
      },
    );

    const warehouses = await warehousesBulkPutDb(data);

    const main =
      (await warehouses).find((warehouse) => get(warehouse, "main", false)) ||
      null;

    set({
      warehouse: {
        main: main,
        data: warehouses,
        updatedAt: serverTime,
      },
    });
    setMetaData(SyncMetaName.warehouse, serverTime, false, false, set);
  } catch (error) {
    console.error("sync currencies error:", error);
    throw error;
  }
};
