"use client";

import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <span className="text-xs font-mono inline-flex items-center gap-1">
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{
          backgroundColor: online ? "#32cd32" : "#ff0000",
          boxShadow: online ? "0 0 6px #32cd32" : "none",
        }}
      />
      <span style={{ color: online ? "#32cd32" : "#ff0000" }}>
        {online ? "ONLINE" : "OFFLINE"}
      </span>
    </span>
  );
}
