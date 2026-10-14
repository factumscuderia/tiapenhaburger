"use client";

import { useState, useEffect } from "react";
import { HOURS } from "@/lib/config";

export function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfOpen = () => {
      // Pegar horário em BH (America/Sao_Paulo)
      const now = new Date();
      const bhTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );
      const hour = bhTime.getHours();
      setIsOpen(hour >= HOURS.open && hour < HOURS.close);
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // checa a cada minuto
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
