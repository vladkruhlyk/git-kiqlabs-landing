"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/b2b/attribution";

/** Сохраняет UTM-метки при входе на любую страницу ветки /b2b. */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
