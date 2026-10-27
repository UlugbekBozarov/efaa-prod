import type { IApiMethod } from "@/api/fetch/apiFetch";
import type { IRequestError } from "@/types";

export type IQueueRecordType = "customer" | "sale" | "refund";
export type IQueueMethod = "create" | "update" | "delete" | "cancel";
export type IQueueStatus =
  | "pending"
  | "processing"
  | "done"
  | "serverError"
  | "networkError";

export type IQueue = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  recordType: IQueueRecordType;
  recordLastKey?: string | undefined;
  path: string;
  method: IApiMethod;
  status: IQueueStatus;
  retries: number;
  dependencies: Array<string>;
  syncAt: Date | null;
  // payload: ISaleQueuePayload;
  error?: IRequestError | null;
};

export type IQueueStore = {
  data: IQueue[];
  page: number;
  totalPages: number;
  notDoneCount: number;
  pendingCount: number;
  processingCount: number;
  errorCount: number;
  doneCount: number;
  totalElements: number;
};
