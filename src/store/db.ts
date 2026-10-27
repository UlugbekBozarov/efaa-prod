import Dexie, { type Table } from "dexie";

import type { IUser } from "./user/user.type";
import type { IShortcut } from "./config/config.type";
import type { ICashbox } from "./cashbox/cashboxes.type";
import type { ICurrency } from "./currency/currency.type";
import type { ICustomer } from "./customer/customer.type";
import type { IEmployee } from "./employee/employees.type";
import type { IMeasure } from "./measure/measure.type";
import type { IPaymentMethod } from "./paymentMethod";
import type { IPrice } from "./price/prices.type";
import type { IProduct } from "./product/products.type";
import type { IProductCategory } from "./productCategory/productCategory.type";
import type { IQueue } from "./queue/queue.type";
import type { IWarehouse } from "./warehouse/warehouse.type";
import type { ISale } from "./sale/sale.type";
import type { IReceipt } from "./receipt/receipt.type";
import type { IImage } from "./images/image.type";
import type { IMeta } from "./meta";

export class PosDB extends Dexie {
  user!: Table<IUser, string>;
  meta!: Table<IMeta, string>;
  shortcuts!: Table<IShortcut, string>;
  receipt!: Table<IReceipt, string>;
  cashboxes!: Table<ICashbox, string>;
  currencies!: Table<ICurrency, string>;
  customers!: Table<ICustomer, string>;
  employees!: Table<IEmployee, string>;
  measures!: Table<IMeasure, string>;
  paymentMethods!: Table<IPaymentMethod, string>;
  prices!: Table<IPrice, string>;
  products!: Table<IProduct, string>;
  productCategories!: Table<IProductCategory, string>;
  warehouses!: Table<IWarehouse, string>;
  // Advanced
  sales!: Table<ISale, string>;
  queues!: Table<IQueue, string>;
  images!: Table<IImage, string>;

  constructor() {
    super("pos-db");

    this.version(2).stores({
      user: "id",
      meta: "id, lastSyncAt, fullSyncNeeded",
      shortcuts: "id, key",
      receipt: "id",
      cashboxes: "id, name, createdAt, updatedAt",
      currencies: "id, code, name, symbol, main, createdAt, updatedAt",
      customers: "id, name, phoneNumber, address, status, createdAt, updatedAt",
      employees: "id, name, phoneNumber, address, status, createdAt, updatedAt",
      measures: "id, name, shortName, code, systemCode, createdAt, updatedAt",
      paymentMethods: "id, name, type, orderNumber, createdAt, updatedAt",
      prices: "id, name, shortName, createdAt, updatedAt",
      products: "id, productId, name, sku, barcode, updatedAt",
      productCategories: "id, name, createdAt, updatedAt",
      warehouses: "id, name, createdAt, updatedAt",
      // Advanced
      sales:
        "id, status, queueId, localSerialNumber, createdAt, localCreatedAt, updatedAt",
      queues:
        "id, syncStatus, status, recordType, method, createdAt, syncAt, updatedAt",
      images: "id",
    });
  }
}
export const db = new PosDB();
