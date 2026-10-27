import { get } from "lodash";

import type { IWarehouse } from "./warehouse.type";
import { db } from "../db";

export async function getWarehouseLastUpdatedAt() {
  const lastUpdatedWarehouse = await db.warehouses.orderBy("updatedAt").last();
  return get(lastUpdatedWarehouse, "updatedAt", null);
}

export async function getAllWarehouses() {
  return await db.warehouses.orderBy("createdAt").toArray();
}

export async function warehousePutDb(warehouse: IWarehouse) {
  await db.warehouses.put(warehouse);
}

export async function warehousesBulkPutDb(warehouses: IWarehouse[]) {
  await db.warehouses.bulkPut(warehouses);

  return await db.warehouses.orderBy("createdAt").toArray();
}
