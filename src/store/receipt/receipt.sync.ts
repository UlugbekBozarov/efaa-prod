import { get } from "lodash";

import { apiFetch } from "@/api/fetch/apiFetch";
import type { SyncResponse } from "@/types";
import { SyncMetaName } from "@/constants";

import type { IZustandSet } from "../app.store.type";
import type { IReceipt } from "./receipt.type";
import { receiptWriteDb } from "./receipt.db";
import { imagePutDb } from "../images/image.db";
import { setMetaData } from "../meta";

export const receiptSync = async (set: IZustandSet) => {
  try {
    setMetaData(
      SyncMetaName.receipt,
      new Date().toISOString(),
      true,
      true,
      set,
    );
    const { serverTime, data: receipt } = await apiFetch<
      SyncResponse<IReceipt>
    >("receipt", {
      method: "GET",
    });

    const logo = get(receipt, "logo");
    if (logo) {
      const receiptLogoBlob = await apiFetch<Blob>(
        `upload${get(receipt, "logo")}`,
        {
          method: "GET",
          responseType: "blob",
        },
      );
      await set({ receipt, receiptLogoBlob });
      await receiptWriteDb(receipt);
      await imagePutDb(logo, receiptLogoBlob);
    } else {
      await set({ receipt });
      await receiptWriteDb(receipt);
    }

    setMetaData(SyncMetaName.receipt, serverTime, false, false, set);
  } catch (error) {
    console.log("Cashbox initialized store exception: ", error);
  }
};
