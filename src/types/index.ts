import { ReactNode } from "react";

import type { NextPage } from "next";

export enum PageAuth {
  Public, // Anyone can access
  Private, // Only logged users can access
  UnPrivate, // Only unlogged users can access
  Admin, // Only admin users can access
}

export type ExtendedPage<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
  auth?: PageAuth;
};
