import { MemberProvider } from '@/integrations/members/providers/MemberProvider';
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { MAINTENANCE_MODE } from '@/config';
import { routes, maintenanceRoutes, basename } from '@/app/routes';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { detectLocale } from '@/lib/i18n/routes';

// MemberProvider is imported from its direct module path (NOT the '@/integrations'
// barrel) so the @wix/ecom / @wix/redirects / cart-store graph is never pulled
// into the server bundle when this island is server-rendered.

// The client browser router is a module-level singleton: createBrowserRouter
// attaches history/popstate listeners, so it must be created exactly once even
// if AppRouter re-mounts. NEVER enable React StrictMode on this island — it
// would double-invoke the initializer below and build two browser routers.
let browserRouter: ReturnType<typeof createBrowserRouter> | null = null;

function makeRouter(initialPath: string) {
  const config = MAINTENANCE_MODE ? maintenanceRoutes : routes;
  if (import.meta.env.SSR) {
    // Fresh per-request memory router on the server — never shared across requests.
    return createMemoryRouter(config, { initialEntries: [initialPath], basename });
  }
  browserRouter ??= createBrowserRouter(config, { basename });
  return browserRouter;
}

interface AppRouterProps {
  /**
   * Request pathname, passed from [...slug].astro. Lets the server memory router
   * and the client browser router resolve the SAME route + locale for a request.
   */
  initialPath?: string;
}

export default function AppRouter({ initialPath = '/' }: AppRouterProps) {
  // Single lazy initializer: seed the language store from the request path so
  // server and client first paint render the same locale's text, then build the
  // router once. This runs synchronously before any child renders. It is safe
  // only because the routed tree has NO Suspense/lazy/route-loaders, so the whole
  // island renders in one synchronous flush (the seed and every t() read happen
  // atomically within a single request's render — see ssr-migration notes).
  const [router] = useState(() => {
    useLanguageStore.setState({ language: detectLocale(initialPath) });
    return makeRouter(initialPath);
  });

  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
