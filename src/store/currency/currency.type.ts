import { type ISide } from "../../types/type";

export interface ICurrencyValue {
  id: string;
  toCurrencyId: string;
  name: string;
  numerator: number;
  denominator: number;
  value: number;
}

export interface ICurrency {
  id: string;
  currencyId: string;
  code: string;
  name: string;
  symbol?: string | undefined;
  main: boolean;
  decimalScale: number;
  roundType: ISide;
  side: ISide;
  values: Array<ICurrencyValue>;
}

export type ICurrencyStore = {
  main: ICurrency | null;
  data: ICurrency[];
  updatedAt: string | null;
};
