import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["reach-portal"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
