import { Navigate, Outlet, useLocation, type RouteObject } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { ScrollUpButton } from '@/components/ui/scroll-up-button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import MaintenancePage from '@/components/pages/MaintenancePage';
import ServicesPage from '@/ServicesPage';
import IndustriesPage from '@/components/pages/IndustriesPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import SafetyPage from '@/components/pages/SafetyPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import ArticlesIndexPage from '@/components/pages/ArticlesIndexPage';
import ArticlePage from '@/components/pages/ArticlePage';
import { PrivacyPage, TermsPage } from '@/components/pages/LegalPage';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { detectLocale, delocalize } from '@/lib/i18n/routes';
import { PAGE_META } from '@/lib/page-meta';

// Shared route configuration as plain data. Crucially this module instantiates
// NO router (no createBrowserRouter/createMemoryRouter), so it is safe to
// evaluate on the server — the router itself is built per-environment in
// Router.tsx (memory router on the server, browser router in the client).
export const basename = import.meta.env.BASE_NAME || '/';

function RouteSync() {
  const location = useLocation();
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  useEffect(() => {
    const lang = detectLocale(location.pathname);
    setLanguage(lang);
    // Keep document.title in sync on client-side navigation. The static HTML
    // already carries the right per-route <title> (PAGE_META is shared with
    // [...slug].astro), but a SPA navigation never reloads the document, so
    // without this the title stays stuck on whichever page was loaded first.
    const trimmed = location.pathname.length > 1
      ? location.pathname.replace(/\/+$/, '')
      : location.pathname;
    const base = delocalize(trimmed) || '/';
    const title = PAGE_META[base]?.[lang]?.title;
    if (title) document.title = title;
  }, [location.pathname, setLanguage]);
  return null;
}

function Layout() {
  return (
    // MotionConfig reducedMotion="user" makes every framer-motion component
    // respect prefers-reduced-motion (transform/layout animations disabled,
    // opacity kept) — the CSS half of the reset lives in global.css.
    <MotionConfig reducedMotion="user">
      <RouteSync />
      <ScrollToTop />
      <Header />
      {/* Single top-level <main>: gives every route a main landmark and a
          valid #main skip-link target (tabIndex so focus() lands on it).
          Header/Footer are hoisted here — not inside the pages — so the
          banner/contentinfo landmarks stay top-level, outside <main>. */}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollUpButton />
    </MotionConfig>
  );
}

const pageChildren: RouteObject[] = [
  { index: true, element: <HomePage />, routeMetadata: { pageIdentifier: 'home' } },
  { path: 'services',   element: <ServicesPage />,   routeMetadata: { pageIdentifier: 'services' } },
  { path: 'industries', element: <IndustriesPage />, routeMetadata: { pageIdentifier: 'industries' } },
  { path: 'projects',   element: <ProjectsPage />,   routeMetadata: { pageIdentifier: 'projects' } },
  { path: 'safety',     element: <SafetyPage />,     routeMetadata: { pageIdentifier: 'safety' } },
  { path: 'about',      element: <AboutPage />,      routeMetadata: { pageIdentifier: 'about' } },
  { path: 'contact',    element: <ContactPage />,    routeMetadata: { pageIdentifier: 'contact' } },
  { path: 'insights',         element: <ArticlesIndexPage />, routeMetadata: { pageIdentifier: 'insights' } },
  { path: 'insights/:slug',   element: <ArticlePage />,       routeMetadata: { pageIdentifier: 'article' } },
  { path: 'privacy',    element: <PrivacyPage />,    routeMetadata: { pageIdentifier: 'privacy' } },
  { path: 'terms',      element: <TermsPage />,      routeMetadata: { pageIdentifier: 'terms' } },
];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...pageChildren,
      { path: 'en', children: pageChildren },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const maintenanceRoutes: RouteObject[] = [
  { path: '*', element: <MaintenancePage /> },
];
