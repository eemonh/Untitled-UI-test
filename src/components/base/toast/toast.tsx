import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle, AlertCircle, X } from "@untitledui/icons";
import { cx } from "@/utils/cx";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

const DURATION = 4500;

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(() => dismiss(), DURATION);
    return () => clearTimeout(timerRef.current);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const isSuccess = toast.type === "success";

  return (
    <div
      className={cx(
        "flex w-full max-w-sm items-start gap-3 rounded-xl border bg-primary p-4 shadow-lg ring-1 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        isSuccess ? "border-success-200 ring-success-100" : "border-error-200 ring-error-100",
      )}
    >
      <div
        className={cx(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isSuccess ? "bg-success-100" : "bg-error-100",
        )}
      >
        {isSuccess ? (
          <CheckCircle className={cx("size-4", "text-fg-success-primary")} />
        ) : (
          <AlertCircle className={cx("size-4", "text-fg-error-primary")} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-primary">{toast.title}</span>
        {toast.message && <span className="text-sm text-tertiary">{toast.message}</span>}
      </div>

      <button
        onClick={dismiss}
        className="shrink-0 rounded-md p-0.5 text-fg-quaternary transition hover:bg-primary_hover hover:text-fg-secondary focus:outline-none"
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
