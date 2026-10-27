import { db } from "../db";
import type { IReceipt } from "./receipt.type";

export async function receiptWriteDb(receipt: IReceipt) {
  await db.receipt.clear();
  await db.receipt.add(receipt);
}

export async function getReceiptDb(): Promise<IReceipt | null> {
  return (await db.receipt.toCollection().first()) ?? null;
}

export async function receiptClearDb() {
  await db.receipt.clear();
}
