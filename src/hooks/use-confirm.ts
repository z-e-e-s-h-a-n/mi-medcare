import { ConfirmContext, ConfirmOptions } from "@/provider/confirm-dialog";
import { useContext } from "react";

export function useConfirm(defaults?: ConfirmOptions) {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }

  const confirm = (options?: ConfirmOptions) => {
    return ctx.confirm({ ...defaults, ...options });
  };

  return { confirm };
}
