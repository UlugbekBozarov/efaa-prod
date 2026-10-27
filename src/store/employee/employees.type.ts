import type { IRoleType } from "../../types/type";

export type IEmployee = {
  id: string;
  employeeId: string;
  name: string;
  personId: string;
  phoneNumber: string | null;
  roleType: IRoleType;
};

export type IEmployeeStore = {
  data: IEmployee[];
  size: number;
  page: number;
  limit: number;
  allDataLoaded: boolean;
  updatedAt: string | null;
};
