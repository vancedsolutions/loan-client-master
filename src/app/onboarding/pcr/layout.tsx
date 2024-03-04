import React from "react";
import { PCRContextProvider } from "@/context/onboarding/personal.credit.repair.context";

export default function PCRLayout({ children }: { children: React.ReactNode }) {
  return (
    <PCRContextProvider>
      <div
        style={{ margin: "0 !important" }}
        className={"pb-20"}
      >
        {" "}
        {children}
      </div>
    </PCRContextProvider>
  );
}
