"use client";

import { useEffect, useState } from "react";

type Clock = { time: string; zone: string; open: boolean };

/**
 * Live clock for an IANA time zone (DST-safe via Intl). Returns null until mounted,
 * so server and client markup never disagree (no hydration mismatch).
 */
export function useLiveClock(timeZone: string): Clock | null {
  const [clock, setClock] = useState<Clock | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const zoneFmt = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" });
    const partsFmt = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "numeric", hour12: false });

    const tick = () => {
      const now = new Date();
      const zone = zoneFmt.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
      const parts = partsFmt.formatToParts(now);
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      const open = !["Sat", "Sun"].includes(weekday) && hour >= 9 && hour < 18;
      setClock({ time: fmt.format(now), zone, open });
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return clock;
}
