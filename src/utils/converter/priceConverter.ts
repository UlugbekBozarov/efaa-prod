import Decimal from "decimal.js";
import { get } from "lodash";

import type { ICurrency } from "@/store/currency";

export const convertForFrom = (
  fromCurrency: ICurrency,
  toCurrencyId: string,
  value: number,
) => {
  if (get(fromCurrency, "id") === toCurrencyId) return new Decimal(value);

  const rate = get(fromCurrency, "values", []).find(
    (val) => get(val, "toCurrencyId") === toCurrencyId,
  );

  if (!rate) return new Decimal(0);

  const decimalValue = new Decimal(value);

  const numerator = new Decimal(get(rate, "numerator", 0));
  const denominator = new Decimal(get(rate, "denominator", 1));

  return decimalValue.mul(numerator).div(denominator);
};

export const convertForTo = (
  fromCurrencyId: string,
  toCurrency: ICurrency,
  value: number,
) => {
  if (fromCurrencyId === get(toCurrency, "id")) return new Decimal(value);

  const rate = get(toCurrency, "values", []).find(
    (val) => get(val, "toCurrencyId") === fromCurrencyId,
  );

  if (!rate) return new Decimal(0);

  const decimalValue = new Decimal(value);

  const numerator = new Decimal(get(rate, "numerator", 0));
  const denominator = new Decimal(get(rate, "denominator", 1));

  return decimalValue.mul(numerator).div(denominator);
};
