import { createRoot } from "react-dom/client";
import { get } from "lodash";

import Receipt from "@/components/receipt/Receipt";
import type { IReceipt } from "@/store/receipt/receipt.type";
import type { ISale } from "@/store/sale";

export const printSaleReceipt = async (
  logoBlob: Blob | null | undefined,
  saleData: ISale,
  receiptConfiguration: IReceipt,
) => {
  const container = document.createElement("div");
  container.id = "print-root";
  container.style.position = "absolute";
  container.style.top = "0px";
  container.style.left = "0px";
  container.style.zIndex = "-1";

  document.body.appendChild(container);

  const root = createRoot(container);

  await new Promise<void>((resolve) => {
    root.render(
      <Receipt
        logoBlob={logoBlob}
        language={get(receiptConfiguration, "language")}
        saleData={saleData}
        receiptData={{
          title: get(receiptConfiguration, "title"),
          footer: get(receiptConfiguration, "footer"),
        }}
        settings={{
          isTitle: get(receiptConfiguration, "titleVisible", false),
          titles: get(receiptConfiguration, "titles", []),
          isTransaction: get(receiptConfiguration, "transactionVisible", false),
          transactions: get(receiptConfiguration, "transactions", []),
          isProduct: get(receiptConfiguration, "productVisible", false),
          products: get(receiptConfiguration, "products", []),
          isDebt: get(receiptConfiguration, "debtVisible", false),
          isFooter: get(receiptConfiguration, "footerVisible", false),
        }}
      />,
    );

    setTimeout(resolve, 100);
  });

  window.print();

  setTimeout(() => {
    root.unmount();
    container.remove();
  }, 0);
};
