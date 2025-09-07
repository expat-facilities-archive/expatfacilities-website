import Toast from "@components/Toast";
import { IToast, ToastType } from "@typeDefs/toast";
import React from "react";
import { io } from "socket.io-client";
import cookies from "js-cookie";
import styled from "styled-components";
import { uri } from "@services/websocket/client";

const ToastContext = React.createContext<{
  toast: (message: string, type?: ToastType, duration?: number) => void;
}>({
  toast: () => undefined,
});

const ToastProvider = (props: any) => {
  const [toasts, setToasts] = React.useState<IToast[]>([]);

  const toast = (
    message: string,
    type: ToastType = "info",
    duration = 10000
  ) => {
    const id = toasts.length > 0 ? toasts[toasts.length - 1].id + 1 : 0;

    setToasts([...toasts, { id, message, type, duration }]);
    // remove toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, duration);
  };

  React.useEffect(() => {
    if (cookies.get("jwtToken")) {
      const socket = io(uri, {
        auth: {
          token: cookies.get("jwtToken"),
        },
      });

      socket.on(
        "show_notification",
        (notification: {
          content: string;
          type: ToastType;
          createdAt: string;
        }) => {
          toast(notification.content, notification.type, 10000);
        }
      );

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  const close = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }} {...props}>
      <Wrapper>
        <Container>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} close={close} />
          ))}
        </Container>
      </Wrapper>
      {props.children}
    </ToastContext.Provider>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 300px;
  max-width: 100%;
  height: calc(100% - 30px * 2);

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    right: 15px;
    width: calc(100% - 15px * 2);
  }
`;

export { ToastContext, ToastProvider };
