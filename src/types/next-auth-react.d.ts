import type { ReactNode } from "react";

import type { SessionProviderProps as Orig } from "next-auth/react";

declare module "next-auth/react" {
  export interface SessionProviderProps extends Orig {
    children?: ReactNode;
  }
  export function SessionProvider(props: SessionProviderProps): ReactNode | Promise<ReactNode>;
}
