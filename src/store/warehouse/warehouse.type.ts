import type { IStatus } from "@/types";
import type { IEmployee } from "../employee";

export type IWarehouse = {
  address: string;
  description?: string | undefined;
  id: string;
  warehouseId: string;
  main: boolean;
  name: string;
  responsible: IEmployee;
  status: IStatus;
  updatedAt: string;
};

export interface IWarehouseStore {
  main: IWarehouse | null;
  data: IWarehouse[];
  updatedAt: string | null;
}
