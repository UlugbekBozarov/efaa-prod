import type { IAppMode, IAppType, IDevice, IRequestError } from "@/types";

import { type IUser } from "./user/user.type";
import type { IShortcut } from "./config/config.type";
import type { ICurrency, ICurrencyStore } from "./currency/currency.type";
import type { IEmployee, IEmployeeStore } from "./employee/employees.type";
import type { IMeasure, IMeasureStore } from "./measure/measure.type";
import type { IWarehouse, IWarehouseStore } from "./warehouse/warehouse.type";
import type { IQueueStatus, IQueueStore } from "./queue/queue.type";
import type { ISync } from "./sync/sync.type";
import type { IReceipt } from "./receipt/receipt.type";
import type { IProduct } from "./product";
import type { IMeta } from "./meta";

export interface IZustandSet {
  (
    partial:
      | IAppStore
      | Partial<IAppStore>
      | ((state: IAppStore) => IAppStore | Partial<IAppStore>),
    replace?: false | undefined,
  ): unknown;
  (
    state: IAppStore | ((state: IAppStore) => IAppStore),
    replace: true,
  ): unknown;
}

export interface IAppStore {
  initialized: boolean;

  initialLoading: boolean;
  initialProgress: {
    section: string;
    value: number;
  };

  meta: {
    firstSync: IMeta | null;
    firstSyncAt: string | null;
    lastSync: IMeta | null;
    lastSyncAt: string | null;
    data: IMeta[];
    fullSyncNeeded: boolean;
  };

  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => Promise<void>;

  user: IUser | null;
  device: IDevice | null;
  userSet: (user: IUser) => Promise<void>;
  userDelete: () => Promise<void>;

  localSerialNumber: number;
  localSerialNumberInitialSet: (value: number) => Promise<void>;
  localSerialNumberSet: (value: number) => Promise<void>;

  type: IAppType;
  typeSet: (type: IAppType) => Promise<void>;
  mode: IAppMode;
  changeMode: () => Promise<void>;
  shortcuts: Record<string, IShortcut> | null;
  shortcutsSet: (shortcuts: Record<string, IShortcut>) => Promise<void>;
  receipt: IReceipt | null;
  receiptLogoBlob?: Blob | null;

  currency: ICurrencyStore;
  currencySet: (currency: ICurrency) => Promise<void>;

  employee: IEmployeeStore;
  employeeSet: (employee: IEmployee) => Promise<void>;

  measure: IMeasureStore;
  measureSet: (measure: IMeasure) => Promise<void>;

  productSet: (product: IProduct) => Promise<void>;

  warehouse: IWarehouseStore;
  warehouseSet: (warehouse: IWarehouse) => Promise<void>;

  initializing: () => Promise<void>;
  backendSync: () => Promise<void>;

  // Advanced
  sync: ISync;
  onPlay: () => Promise<void>;
  onPause: () => Promise<void>;
  queue: IQueueStore;
  queueUpdateProcessing: (queueId: string) => Promise<void>;
  queueUpdateError: (
    queueId: string,
    status: IQueueStatus,
    error: IRequestError,
  ) => Promise<void>;
}

export type IZustandGet = () => IAppStore;
