import React from "react";

import cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { uri } from "@services/websocket/client";

type SocketType = {
  socket: Socket;
  roomId?: string | null;
  join: (roomId: string) => void;
  leave: () => void;
  sendMessage: (message: string) => void;
};

type Props = {
  children?: React.ReactNode;
};

const SocketProvider: React.FC<Props> = ({ children }: Props) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [roomId, setRoomId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const s = io(uri, {
      auth: {
        token: cookies.get("jwtToken"),
      },
    });
    setSocket(s);

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  React.useEffect(() => {
    if (!socket) return;

    const disconnect = () => {
      setSocket(null);

      socket.once("reconnect", () => {
        setSocket(socket);
        //TODO: reconnect to room
      });
    };

    socket.on("disconnect", disconnect);
  }, [socket]);

  const join = React.useCallback((roomId: string) => {
    if (!roomId) {
      return;
    }
    setRoomId(roomId);
  }, []);

  const leave = React.useCallback(() => {
    setRoomId(null);
  }, []);

  const sendMessage = React.useCallback(
    (message: string) => {
      if (!roomId || !socket) {
        return;
      }

      socket.emit("message", {
        roomId,
        message,
      });
    },
    [roomId, socket]
  );

  if (!socket) {
    return null;
  }

  const data = Object.freeze({
    socket,
    roomId,
    join,
    leave,
    sendMessage,
  });

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

const SocketContext = React.createContext<SocketType | null>(null);

export default SocketProvider;
