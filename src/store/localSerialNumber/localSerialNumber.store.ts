import type { IZustandSet } from "../app.store.type";

export const initialSerialNumber = 10000;

export const localSerialNumberInitialSet =
  (set: IZustandSet) => async (value: number) => {
    set({ localSerialNumber: value });
  };

export const localSerialNumberSet =
  (set: IZustandSet) => async (value: number) => {
    set({ localSerialNumber: value });
  };
