import { ConfirmContext, ConfirmOptions } from "@/provider/confirm-dialog";
import { useCallback, useContext } from "react";

export function useConfirm(defaults?: ConfirmOptions) {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }

  const confirm = useCallback(
    (options?: ConfirmOptions) => ctx.confirm({ ...defaults, ...options }),
    [ctx, defaults],
  );

  return { confirm };
}
