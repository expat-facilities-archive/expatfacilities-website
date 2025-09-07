export interface IToast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export type ToastType = "info" | "success" | "warning" | "error";
