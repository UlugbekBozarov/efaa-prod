import type { ISaleResponse } from "@/store/sale/sale.type";
import type { ISaleQueuePayload } from "@/store/queue";
import { apiFetch, type IApiMethod } from "@/api/fetch/apiFetch";

export async function saleBackendSync(
  method: IApiMethod,
  payload: ISaleQueuePayload,
) {
  const response = await apiFetch<ISaleResponse>("sales", {
    method,
    body: payload,
  });

  return response;
}
