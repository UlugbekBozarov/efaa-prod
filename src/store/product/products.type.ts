import type { ICurrency } from "../currency/currency.type";
import type { IMeasure } from "../measure/measure.type";
import type { IProductCategory } from "../productCategory/productCategory.type";

export type IProduct = {
  barcode?: string | null;
  category: IProductCategory | null;
  counts: {
    [warehouseId: string]: {
      amount: number;
      id: string;
      updatedAt: string;
      warehouseId: string;
    };
  };
  id: string;
  measure: IMeasure;
  name: string;
  nameSearch: string;
  prices: {
    [priceId: string]: {
      currency: ICurrency;
      currencyId: string;
      id: string;
      maximalPrice: number | null;
      minimalAmount: number | null;
      minimalPrice: number | null;
      price: number;
      priceId: string;
    };
  };
  productId: string;
  sku: number;
  skuSearch: string;
  type: string;
  updatedAt: string;
};
