import type { ReactNode } from "react";
import { AppStateContext, useAppStateValue } from "@/state/store";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const value = useAppStateValue();
  return <AppStateContext value={value}>{children}</AppStateContext>;
}
