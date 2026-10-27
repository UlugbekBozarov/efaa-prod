import { get } from "lodash";

import type { IEmployee } from "./employees.type";
import { db } from "../db";

export async function getEmployeeLastUpdatedAt() {
  const lastUpdatedEmployee = await db.employees.orderBy("updatedAt").last();
  return get(lastUpdatedEmployee, "updatedAt", null);
}

export async function getFirstFiftyEmployees() {
  return await db.employees.orderBy("createdAt").limit(50).toArray();
}

export async function getEmployeesCount() {
  return await db.employees.count();
}

export async function employeePutDb(employee: IEmployee) {
  await db.employees.put(employee);
}

export async function employeesBulkPutDb(employees: IEmployee[]) {
  await db.employees.bulkPut(employees);
}
