import { get } from "lodash";
import type { IAppStore, IZustandSet } from "../app.store.type";
import {
  currencyPutDb,
  getAllCurrencies,
  getCurrencyLastUpdatedAt,
} from "./currency.db";
import type { ICurrency } from "./currency.type";

export const initialCurrency = {
  main: null,
  data: [],
  updatedAt: null,
};

export const currencyInitialized = async (set: IZustandSet) => {
  try {
    const lastUpdatedAt = await getCurrencyLastUpdatedAt();

    const currencies = await getAllCurrencies();

    const main =
      (await currencies).find((currency) => get(currency, "main", false)) ||
      null;

    set({
      currency: {
        main,
        data: currencies,
        updatedAt: lastUpdatedAt,
      },
    });
  } catch (error) {
    console.log("Currency initialized store exception: ", error);
  }
};

export const currencySet =
  (set: IZustandSet) => async (currency: ICurrency) => {
    set((state: IAppStore) => {
      const index = state.currency.data.findIndex((c) => c.id === currency.id);

      if (index !== -1) {
        const newData = [...state.currency.data];
        newData[index] = currency;

        const mainCurrency = get(currency, "main")
          ? currency
          : get(state, "currency.main");

        return {
          currency: {
            ...state.currency,
            main: mainCurrency,
            data: newData,
          },
        };
      }

      return {};
    });

    await currencyPutDb(currency);
  };
