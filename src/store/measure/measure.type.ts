import type { ISide } from "@/types";

export type IMeasureSystemCode =
  | "piece"
  | "kilogram"
  | "litre"
  | "metre"
  | "other";

export interface IMeasure {
  id: string;
  name: string;
  byDefault: boolean;
  shortName?: string | undefined;
  code?: string | undefined;
  decimalScale: number;
  side: ISide;
  systemCode: IMeasureSystemCode;
  updatedAt: string;
}

export interface IMeasureStore {
  byDefault: IMeasure | null;
  data: IMeasure[];
  updatedAt: string | null;
}
