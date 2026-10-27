import { db } from "../db";

export async function getQueueTotals() {
  const [totalElements, doneCount, processingCount, pendingCount, errorCount] =
    await Promise.all([
      db.queues.count(),
      db.queues.where("status").equals("done").count(),
      db.queues.where("status").equals("processing").count(),
      db.queues.where("status").equals("pending").count(),
      db.queues.where("status").anyOf(["serverError", "networkError"]).count(),
    ]);

  const notDoneCount = totalElements - doneCount;

  return {
    totalElements,
    doneCount,
    processingCount,
    pendingCount,
    errorCount,
    notDoneCount,
  };
}

export async function getQueues(limit: number = 20) {
  return await db.queues
    .where("status")
    .anyOf(["pending", "processing", "serverError", "networkError"])
    .sortBy("createdAt")
    .then((arr) => arr.slice(0, limit));
}

export async function queueDbUpdate(
  queueId: string,
  data: object,
  limit: number = 20,
) {
  await db.queues.update(queueId, data);

  const queues = await db.queues
    .where("status")
    .anyOf(["pending", "processing", "serverError", "networkError"])
    .sortBy("createdAt")
    .then((arr) => arr.slice(0, limit));

  const [totalElements, doneCount, processingCount, pendingCount, errorCount] =
    await Promise.all([
      db.queues.count(),
      db.queues.where("status").equals("done").count(),
      db.queues.where("status").equals("processing").count(),
      db.queues.where("status").equals("pending").count(),
      db.queues.where("status").anyOf(["serverError", "networkError"]).count(),
    ]);

  const notDoneCount = totalElements - doneCount;
  return {
    totalElements,
    doneCount,
    processingCount,
    pendingCount,
    errorCount,
    notDoneCount,
    queues,
  };
}

// export async function createSaleWithQueue(
//   queueId: string,
//   date: Date,
//   localSerialNumber: number,
//   data: ISale,
//   limit: number,
// ) {
//   await db.transaction("rw", db.queues, db.sales, async () => {
//     await db.queues.add({
//       id: queueId,
//       createdAt: date,
//       updatedAt: date,
//       recordType: "sale",
//       recordLastKey: String(localSerialNumber),
//       method: "POST",
//       status: "pending",
//       retries: 0,
//       dependencies: [],
//       syncAt: null,
//     });

//     await db.sales.add(data);
//   });

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
//     db.queues.where("status").anyOf(["serverError", "networkError"]).count(),
//     db.sales.count(),
//   ]);

//   const notDoneCount = queueTotalElements - doneCount;

//   const queues = await db.queues
//     .where("status")
//     .anyOf(["pending", "processing", "serverError", "networkError"])
//     .sortBy("createdAt")
//     .then((arr) => arr.slice(0, limit));

//   const sales = await db.sales.orderBy("localCreatedAt").limit(limit).toArray();

//   return {
//     queueTotalElements,
//     doneCount,
//     processingCount,
//     pendingCount,
//     errorCount,
//     notDoneCount,
//     queues,
//     saleTotalElements,
//     sales,
//   };
// }
