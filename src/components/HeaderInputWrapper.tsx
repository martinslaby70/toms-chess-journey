import { ReactNode } from "react";

export const HeaderInputWrapper = (props: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      gap: "1rem",
    }}
  >
    {props.children}
  </div>
);
