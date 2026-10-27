export type IAppType = "desktop" | "tablet";

export type IAppMode = "light" | "dark";

export type ISide = "start" | "end";

export type IRoleType = "SUPER_ADMIN" | "USER" | "EMPLOYEE";

export type IStatus = "active" | "inactive";

export type ISyncResponseError = {
  message: string;
  code: number;
  createdAt: Date;
  details: string;
};

export type IOutletContext = {
  syncOpen: boolean;
};

export type IDevice = {
  id: string;
  deviceId: string;
  serialNumber: number;
  name: string;
};

export type IRequestError = {
  statusCodeValue: number;
  body:
    | string
    | Record<
        string,
        {
          message: string;
          value?: string | number | null;
        }
      >;
};

export interface IPerson {
  name: string;
  botConnected: boolean;
  type: "physical" | "legal";
  phoneNumber?: string | undefined;
  address?: string | number;
  id: string;
  status: IStatus;
}

export type SyncResponse<T> = {
  serverTime: string;
  data: T;
};
