// hooks/useSocketNotifications.ts
import { useEffect } from "react";
import socket from "@/lib/api/socket" // Adjust the import path as necessary
import { toast } from "react-toastify";

export const useSocketNotifications = (userId: string) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("notification", (data) => {
      toast.info(data.message || "You have a new notification");
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);
};
