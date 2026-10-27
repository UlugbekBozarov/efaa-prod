import type { IRoleType } from "@/types/type";

export type IUser = {
  deviceId: string;
  deviceName: string;
  deviceSerialNumber: number;
  id: string;
  localSerialNumber: number;
  name: string;
  personId: string;
  phoneNumber: string;
  role: IRoleType;
  sessionExpiredAt: string;
  sessionSerialNumber: number;
};
