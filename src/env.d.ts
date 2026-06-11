/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

// Local replacement for the former `@wix/astro-pages` PageMetadata type.
type PageMetadata = {
  pageIdentifier?: string;
  [key: string]: unknown;
};

declare global {
  interface ImportMetaEnv {
    readonly BASE_NAME?: string;
    readonly PUBLIC_WEB3FORMS_KEY?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module "react-router-dom" {
  export interface IndexRouteObject {
    routeMetadata?: PageMetadata;
  }
  export interface NonIndexRouteObject {
    routeMetadata?: PageMetadata;
  }
}

export {};
