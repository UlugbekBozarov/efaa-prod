import { productPutDb } from "./product.db";

import type { IProduct } from "./products.type";

export const productSet = async (product: IProduct) => {
  await productPutDb(product);
};

// export const productSet = (set: IZustandSet) => async (product: IProduct) => {
//   await productPutDb(product);
// };
