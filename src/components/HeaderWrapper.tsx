import { ReactNode } from "react";

export const HeaderWrapper = (props: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "3rem",
    }}
  >
    {props.children}
  </div>
);
