import type { IAppMode, IAppType } from "@/types";

export type IShortcut = {
  id: string;
  alt: boolean;
  ctrl: boolean;
  key: string;
  meta: boolean;
  shift: boolean;
};

export interface IAppConfigResponse {
  id: string | null;
  type: IAppType;
  mode: IAppMode;
  shortcuts: IShortcut[];
  paymentMethodShortcuts: IShortcut[];
  createdAt: string | null;
  updatedAt: string | null;
}
