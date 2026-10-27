import { get } from "lodash";

import type { ICurrency } from "./currency.type";
import { db } from "../db";

export async function getCurrencyLastUpdatedAt() {
  const lastUpdatedCurrency = await db.currencies.orderBy("updatedAt").last();
  return get(lastUpdatedCurrency, "updatedAt", null);
}

export async function getAllCurrencies() {
  return await db.currencies.orderBy("createdAt").toArray();
}

export async function currencyPutDb(currency: ICurrency) {
  await db.currencies.put(currency);
}

export async function currenciesBulkPutDb(currencies: ICurrency[]) {
  await db.currencies.bulkPut(currencies);

  return await db.currencies.orderBy("createdAt").toArray();
}
