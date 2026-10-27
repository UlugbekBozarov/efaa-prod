import { get } from "lodash";

import { useAppStore } from "@/store/app.store";
import type { IRequestError } from "@/types";
import type { IQueue } from "@/store/queue";

import { saleBackendSync } from "./sync";

export async function dispatchSync(queue: IQueue) {
  switch (queue.recordType) {
    case "sale": {
      await saleBackendSync(get(queue, "method"), get(queue, "payload"))
        .then(async (response) => {
          await useAppStore
            .getState()
            .queueUpdateDone(get(queue, "id"), response);
        })
        .catch(async (error: IRequestError) => {
          await useAppStore
            .getState()
            .queueUpdateError(get(queue, "id"), "serverError", error);
        });
      break;
    }

    case "refund":
      //   return syncSaleRefund(queue);
      return null;

    case "customer":
      //   return syncCustomer(queue);
      return;

    default:
      throw new Error(`Unknown recordType: ${queue.recordType}`);
  }
}
