import { ref } from "vue";

export interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const toasts = ref<ToastMessage[]>([]);
let toastId = 0;

export function useToast() {
  function show(message: string, type: ToastMessage["type"] = "info", duration = 3000) {
    const id = ++toastId;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      dismiss(id);
    }, duration);
  }

  function dismiss(id: number) {
    const idx = toasts.value.findIndex((t) => t.id === id);
    if (idx !== -1) {
      toasts.value.splice(idx, 1);
    }
  }

  function success(message: string) {
    show(message, "success");
  }

  function error(message: string) {
    show(message, "error");
  }

  function info(message: string) {
    show(message, "info");
  }

  return {
    toasts,
    show,
    dismiss,
    success,
    error,
    info,
  };
}
