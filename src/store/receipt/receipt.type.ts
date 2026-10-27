import type { IEmployee } from "../employee";

export type IReceiptField = {
  labelKey: string;
  field: string;
  visible: boolean;
  orderNumber: number;
};

export type IReceipt = {
  id: string;
  createdAt: string;
  createdBy: IEmployee;
  updatedAt: string;
  updatedBy: IEmployee;
  title: string;
  language: string;
  footer: string;
  logo?: string | null;
  titleVisible: boolean;
  logoVisible: boolean;
  titles: IReceiptField[];
  transactions: IReceiptField[];
  productVisible: boolean;
  products: IReceiptField[];
  balanceVisible: boolean;
  balances: IReceiptField[];
  debtVisible: boolean;
  footerVisible: boolean;
};
