import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg shadow-lg px-4 py-3 text-sm font-medium text-cream border animate-[toast-in_0.2s_ease-out] ${
              t.type === "error"
                ? "bg-accent border-accent2"
                : "bg-panel border-accent2/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{t.type === "error" ? "⚠️" : "✅"}</span>
              <span>{t.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);