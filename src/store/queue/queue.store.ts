import { get } from "lodash";

// import { startQueueWorker } from "@/services";
import type { IDevice, IRequestError } from "@/types";

import type { IQueueStatus } from "./queue.type";
import type { IAppStore, IZustandSet } from "../app.store.type";

import { queueDbUpdate } from "./queue.db";
import { db } from "../db";

export const initialQueue = {
  data: [],
  page: 1,
  totalPages: 1,
  notDoneCount: 0,
  processingCount: 0,
  pendingCount: 0,
  errorCount: 0,
  doneCount: 0,
  totalElements: 0,
};

const limit = 20;

export const queueInitialized = async (set: IZustandSet) => {
  try {
    const processingQueues = await db.queues
      .where("status")
      .equals("processing")
      .toArray();

    await processingQueues.forEach(async (queue) => {
      await db.queues.update(get(queue, "id"), {
        status: "pending",
      });
    });

    const [
      totalElements,
      doneCount,
      processingCount,
      pendingCount,
      errorCount,
      queues,
    ] = await Promise.all([
      db.queues.count(),
      db.queues.where("status").equals("done").count(),
      db.queues.where("status").equals("processing").count(),
      db.queues.where("status").equals("pending").count(),
      db.queues.where("status").anyOf(["serverError", "networkError"]).count(),
      db.queues
        .where("status")
        .anyOf(["pending", "processing", "serverError", "networkError"])
        .sortBy("createdAt")
        .then((arr) => arr.slice(0, limit)),
    ]);

    const notDoneCount = totalElements - doneCount;
    const totalPages = Math.max(1, Math.ceil(totalElements / limit));
    set({
      queue: {
        data: queues,
        page: 1,
        totalPages: totalPages,
        notDoneCount,
        processingCount,
        pendingCount,
        errorCount,
        doneCount,
        totalElements,
      },
    });
  } catch (error) {
    console.log("Payment method initialized store exception: ", error);
  }
};

export const saleCreateQueueSet =
  (set: IZustandSet, getStore: () => IAppStore) =>
  async (device: IDevice, data: any) => {
    // const store = await getStore();
    // const queueId = v4();
    // const localSaleId = v4();
    // const date = new Date();
    // const localSerialNumber = get(store, "localSerialNumber", 10000);
    // const nextLocalSerialNumber = localSerialNumber + 1;
    // const saleQueuePayload: ISaleQueuePayload = {
    //   localSerialNumber,
    //   localCreatedAt: date,
    //   status: get(data, "status"),
    //   order: get(data, "order", null),
    //   date: get(data, "date"),
    //   paymentDueDate: get(data, "paymentDueDate", null),
    //   customerId: get(data, "customer.customerId", null),
    //   currencyId: get(data, "currency.currencyId"),
    //   warehouseId: get(data, "warehouse.warehouseId"),
    //   responsibleId: get(data, "responsible.employeeId"),
    //   description: get(data, "description"),
    //   sendMessage: get(data, "sendMessage"),
    //   editMessage: get(data, "editMessage"),
    //   message: get(data, "message"),
    //   products: get(data, "products", []).map((product) => ({
    //     productId: get(product, "productId"),
    //     amount: get(product, "amount"),
    //     price: get(product, "price"),
    //     description: get(product, "description"),
    //   })),
    //   discounts: get(data, "discounts", []).map((discount) => ({
    //     amount: get(discount, "amount"),
    //     currencyId: get(discount, "currency.currencyId"),
    //     description: get(discount, "description"),
    //   })),
    //   payments: get(data, "payments", []).map((payment) => ({
    //     paymentMethodId: get(payment, "paymentMethodId"),
    //     amount: get(payment, "amount"),
    //     currencyId: get(payment, "currency.currencyId"),
    //     description: get(payment, "description"),
    //   })),
    //   refunds: get(data, "refunds", []).map((refund) => ({
    //     paymentMethodId: get(refund, "paymentMethodId"),
    //     amount: get(refund, "amount"),
    //     currencyId: get(refund, "currency.currencyId"),
    //     description: get(refund, "description"),
    //   })),
    // };
    // const saleData: ISale = {
    //   id: localSaleId,
    //   saleId: null,
    //   serialNumber: `${get(device, "serialNumber")}-${localSerialNumber}`,
    //   queueId,
    //   syncStatus: "pending",
    //   syncedAt: null,
    //   syncedError: null,
    //   device,
    //   createdAt: null,
    //   createdBy: null,
    //   updatedAt: null,
    //   updatedBy: null,
    //   localCreatedAt: date,
    //   localSerialNumber,
    //   status: get(data, "status"),
    //   order: get(data, "order", null),
    //   date: get(data, "date"),
    //   paymentDueDate: get(data, "paymentDueDate", null),
    //   customer: get(data, "customer", null),
    //   currency: get(data, "currency"),
    //   warehouse: get(data, "warehouse"),
    //   responsible: get(data, "responsible"),
    //   description: get(data, "description"),
    //   sendMessage: get(data, "sendMessage"),
    //   editMessage: get(data, "editMessage"),
    //   message: get(data, "message"),
    //   subtotal: get(data, "subtotal"),
    //   products: get(data, "products", []).map((product) => ({
    //     id: get(product, "productId"),
    //     productId: get(product, "productId"),
    //     sku: get(product, "sku"),
    //     barcode: get(product, "barcode"),
    //     measure: get(product, "measure"),
    //     name: get(product, "name"),
    //     amount: get(product, "amount"),
    //     price: get(product, "price"),
    //     description: get(product, "description"),
    //   })),
    //   totalDiscount: get(data, "totalDiscount"),
    //   discounts: get(data, "discounts", []).map((discount) => ({
    //     amount: get(discount, "amount"),
    //     currency: get(discount, "currency"),
    //     description: get(discount, "description"),
    //   })),
    //   totalPayment: get(data, "totalPayment"),
    //   payments: get(data, "payments", []),
    //   totalRefund: get(data, "totalRefund"),
    //   refunds: get(data, "refunds", []),
    // };
    // await db.transaction("rw", db.queues, db.sales, async () => {
    //   await db.queues.add({
    //     id: queueId,
    //     createdAt: date,
    //     updatedAt: date,
    //     recordType: "sale",
    //     path: "sales",
    //     recordLastKey: String(localSerialNumber),
    //     method: "POST",
    //     status: "pending",
    //     retries: 0,
    //     dependencies: [],
    //     syncAt: null,
    //     payload: saleQueuePayload,
    //   });
    //   await db.sales.add(saleData);
    //   const [
    //     queueTotalElements,
    //     doneCount,
    //     processingCount,
    //     pendingCount,
    //     errorCount,
    //     saleTotalElements,
    //   ] = await Promise.all([
    //     db.queues.count(),
    //     db.queues.where("status").equals("done").count(),
    //     db.queues.where("status").equals("processing").count(),
    //     db.queues.where("status").equals("pending").count(),
    //     db.queues
    //       .where("status")
    //       .anyOf(["serverError", "networkError"])
    //       .count(),
    //     db.sales.count(),
    //   ]);
    //   const notDoneCount = queueTotalElements - doneCount;
    //   const queues = await db.queues
    //     .where("status")
    //     .anyOf(["pending", "processing", "serverError", "networkError"])
    //     .sortBy("createdAt")
    //     .then((arr) => arr.slice(0, limit));
    //   const sales = await db.sales
    //     .orderBy("localCreatedAt")
    //     .reverse()
    //     .limit(limit)
    //     .toArray();
    //   const totalPages = Math.max(1, Math.ceil(queueTotalElements / limit));
    //   const saleTotalPages = Math.max(1, Math.ceil(saleTotalElements / limit));
    //   set({
    //     localSerialNumber: nextLocalSerialNumber,
    //     queue: {
    //       data: queues,
    //       page: 1,
    //       totalPages: totalPages,
    //       notDoneCount,
    //       processingCount,
    //       pendingCount,
    //       errorCount,
    //       doneCount,
    //       totalElements: queueTotalElements,
    //     },
    //     sale: {
    //       pendingCount: notDoneCount,
    //       errorCount,
    //       data: sales,
    //       page: 1,
    //       totalPages: saleTotalPages,
    //       totalElements: saleTotalElements,
    //     },
    //   });
    // });
    // startQueueWorker();
    // return saleData;
  };

export const queueUpdateProcessing =
  (set: IZustandSet) => async (queueId: string) => {
    const {
      totalElements,
      doneCount,
      processingCount,
      pendingCount,
      errorCount,
      notDoneCount,
      queues,
    } = await queueDbUpdate(queueId, { status: "processing" }, limit);

    const totalPages = Math.max(1, Math.ceil(totalElements / limit));
    set({
      queue: {
        data: queues,
        page: 1,
        totalPages,
        notDoneCount,
        processingCount,
        pendingCount,
        errorCount,
        doneCount,
        totalElements,
      },
    });
  };

export const queueUpdateDone =
  (set: IZustandSet) => async (queueId: string, saleResponse: any) => {
    const {
      totalElements,
      doneCount,
      processingCount,
      pendingCount,
      errorCount,
      notDoneCount,
      queues,
    } = await queueDbUpdate(queueId, { status: "done" }, limit);

    const totalPages = Math.max(1, Math.ceil(totalElements / limit));
    set({
      queue: {
        data: queues,
        page: 1,
        totalPages,
        notDoneCount,
        processingCount,
        pendingCount,
        errorCount,
        doneCount,
        totalElements,
      },
    });

    // await saleUpdateDone(set, queueId, saleResponse);
  };

export const queueUpdateError =
  (set: IZustandSet) =>
  async (queueId: string, status: IQueueStatus, error: IRequestError) => {
    const {
      totalElements,
      doneCount,
      processingCount,
      pendingCount,
      errorCount,
      notDoneCount,
      queues,
    } = await queueDbUpdate(queueId, { status, error }, limit);

    const totalPages = Math.max(1, Math.ceil(totalElements / limit));
    set({
      queue: {
        data: queues,
        page: 1,
        totalPages,
        notDoneCount,
        processingCount,
        pendingCount,
        errorCount,
        doneCount,
        totalElements,
      },
    });

    // await saleUpdateError(set, queueId, status, error);
  };
