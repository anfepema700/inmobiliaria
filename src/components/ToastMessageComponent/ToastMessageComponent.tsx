import React, { createContext, useRef, ReactNode } from "react";
import { Toast } from "primereact/toast";

export type NotificationType = {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail: string;
};

type NotificationContextType = (message: NotificationType) => void;

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const toast = useRef<Toast>(null);

  const showNotification = ({
    severity,
    summary,
    detail,
  }: NotificationType) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail, life: 3000 });
    }
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      <Toast ref={toast} />
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
