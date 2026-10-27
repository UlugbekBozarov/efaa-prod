import {
  employeePutDb,
  getEmployeeLastUpdatedAt,
  getEmployeesCount,
  getFirstFiftyEmployees,
} from "./employee.db";
import type { IEmployee } from "./employees.type";

import type { IAppStore, IZustandSet } from "../app.store.type";

export const initialEmployee = {
  data: [],
  size: 0,
  page: 1,
  limit: 50,
  allDataLoaded: false,
  updatedAt: null,
};

export const employeeInitialized = async (set: IZustandSet) => {
  try {
    const lastUpdatedAt = await getEmployeeLastUpdatedAt();

    const employees = await getFirstFiftyEmployees();

    const employeesCount = await getEmployeesCount();

    set({
      employee: {
        data: employees,
        size: employeesCount,
        page: 1,
        limit: 50,
        allDataLoaded: employeesCount <= 50,
        updatedAt: lastUpdatedAt,
      },
    });
  } catch (error) {
    console.log("Employee initialized store exception: ", error);
  }
};

export const employeeSet =
  (set: IZustandSet) => async (employee: IEmployee) => {
    set((state: IAppStore) => {
      const index = state.employee.data.findIndex((c) => c.id === employee.id);

      if (index !== -1) {
        const newData = [...state.employee.data];
        newData[index] = employee;

        return {
          employee: {
            ...state.employee,
            data: newData,
          },
        };
      }

      return {};
    });

    await employeePutDb(employee);
  };
