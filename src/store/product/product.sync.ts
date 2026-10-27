import { apiFetch } from "@/api/fetch/apiFetch";
import { SyncMetaName } from "@/constants";

import { getProductsLastUpdatedAt, productsBulkPutDb } from "./product.db";
import type { IZustandSet } from "../app.store.type";
import type { IProduct } from "./products.type";
import { setMetaData } from "../meta";

export const productsSync = async (
  set: IZustandSet,
  oldProgress: number,
  progressWeight: number,
) => {
  let page = 1;
  setMetaData(SyncMetaName.product, new Date().toISOString(), true, true, set);

  try {
    const updatedAt = await getProductsLastUpdatedAt();
    while (true) {
      const { content, totalPages, last } = await apiFetch<{
        content: IProduct[];
        totalElements: number;
        totalPages: number;
        first: boolean;
        last: boolean;
      }>(`products/for-pos`, {
        method: "GET",
        query: updatedAt
          ? { page, updatedAt: new Date(updatedAt).toString() }
          : { page },
      });

      const innerProgress = Math.floor((page / totalPages) * progressWeight);

      if (last) {
        await productsBulkPutDb(content);
        setMetaData(
          SyncMetaName.product,
          new Date().toISOString(),
          false,
          false,
          set,
        );
        return;
      } else {
        await productsBulkPutDb(content);
      }

      if (oldProgress + innerProgress > 100) {
        window.location.href = "/";
      }

      await set({
        initialProgress: {
          section: "Loading products....",
          value: oldProgress + innerProgress,
        },
      });

      page++;
    }
  } catch (error) {
    console.error("sync products error:", error);
    throw error;
  }
};
