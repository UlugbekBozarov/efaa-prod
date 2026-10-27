import { get } from "lodash";
import type { IAppStore, IZustandSet } from "../app.store.type";
import {
  getAllWarehouses,
  getWarehouseLastUpdatedAt,
  warehousePutDb,
} from "./warehouse.db";
import type { IWarehouse } from "./warehouse.type";

export const initialWarehouse = {
  main: null,
  data: [],
  updatedAt: null,
};

export const warehouseInitialized = async (set: IZustandSet) => {
  try {
    const lastUpdatedAt = await getWarehouseLastUpdatedAt();

    const warehouses = await getAllWarehouses();

    const main =
      (await warehouses).find((warehouse) => get(warehouse, "main", false)) ||
      null;

    set({
      warehouse: {
        main,
        data: warehouses,
        updatedAt: lastUpdatedAt,
      },
    });
  } catch (error) {
    console.log("Measure initialized store exception: ", error);
  }
};

export const warehouseSet =
  (set: IZustandSet) => async (warehouse: IWarehouse) => {
    set((state: IAppStore) => {
      const index = state.warehouse.data.findIndex(
        (w) => w.id === warehouse.id,
      );

      if (index !== -1) {
        const newData = [...state.warehouse.data];
        newData[index] = warehouse;

        return {
          warehouse: {
            ...state.warehouse,
            data: newData,
          },
        };
      }

      return {};
    });

    await warehousePutDb(warehouse);
  };
