import { useState } from "react";
import { Message } from "primereact/message";
import { MessageComponentProps } from "./models/messageComponent.model";
import "./messageComponent.css";

const MessageComponent = ({
  severity = "error",
  message,
  onClose,
}: MessageComponentProps): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const severityIconClass = {
    success: "pi pi-check",
    info: "pi pi-info-circle",
    warn: "pi pi-exclamation-triangle",
    error: "pi pi-times-circle",
  };

  const handleClose = (): void => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      {visible && (
        <>
          <Message
            severity={severity}
            content={
              <>
                <div className="flex align-items-center p-1">
                  {severity && (
                    <i
                      className={`${severityIconClass[severity]} mr-2 mt-1`}
                    ></i>
                  )}
                  <div>{message}</div>
                  <span
                    className="pi pi-times pl-3 mt-1 cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
              </>
            }
          />
        </>
      )}
    </div>
  );
};

export default MessageComponent;
