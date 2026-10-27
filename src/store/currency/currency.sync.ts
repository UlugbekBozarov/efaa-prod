import { get } from "lodash";

import { apiFetch } from "@/api/fetch/apiFetch";
import type { SyncResponse } from "@/types";
import { SyncMetaName } from "@/constants";

import { currenciesBulkPutDb, getCurrencyLastUpdatedAt } from "./currency.db";
import type { IZustandSet } from "../app.store.type";
import type { ICurrency } from "./currency.type";
import { setMetaData } from "../meta";

export const currenciesSync = async (set: IZustandSet) => {
  try {
    setMetaData(
      SyncMetaName.currency,
      new Date().toISOString(),
      true,
      true,
      set,
    );
    const updatedAt = await getCurrencyLastUpdatedAt();
    const { serverTime, data } = await apiFetch<SyncResponse<ICurrency[]>>(
      "currencies/for-pos",
      {
        method: "GET",
        query: updatedAt
          ? { updatedAt: new Date(updatedAt).toString() }
          : undefined,
      },
    );

    const currencies = await currenciesBulkPutDb(data);

    const main =
      (await currencies).find((currency) => get(currency, "main", false)) ||
      null;

    set({
      currency: {
        main: main,
        data: currencies,
        updatedAt: serverTime,
      },
    });

    setMetaData(SyncMetaName.currency, serverTime, false, false, set);
  } catch (error) {
    console.log("Cashbox initialized store exception: ", error);
  }
};
