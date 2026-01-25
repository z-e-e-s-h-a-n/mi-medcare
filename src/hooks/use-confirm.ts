import { ConfirmContext } from "@/provider/alert-dialog";
import { useContext } from "react";


export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) {
        throw new Error("useConfirm must be used within AlertDialogProvider");
    }
    return ctx.confirm;
}
