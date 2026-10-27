import { get } from "lodash";

import type { IProduct } from "./products.type";
import { db } from "../db";

export async function getProductsLastUpdatedAt() {
  const lastUpdatedProduct = await db.products.orderBy("updatedAt").last();
  return get(lastUpdatedProduct, "updatedAt", null);
}

export async function productPutDb(product: IProduct) {
  await db.products.put(product);
}

export async function productsBulkPutDb(products: IProduct[]) {
  await db.products.bulkPut(products);
}
