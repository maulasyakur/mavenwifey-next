"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    // Initial set
    const updateTime = () => {
      const dateObject = new Date();
      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const currentTime =
        hour.toString().padStart(2, "0") +
        " : " +
        minute.toString().padStart(2, "0");
      setTime(currentTime);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty deps array is fine here

  return (
    <div className="flex items-center gap-2 p-2 bg-black h-header">
      <div className="text-sm mr-auto">{time}</div>
      <Signal />
      <Wifi />
      <BatteryFull />
    </div>
  );
}
