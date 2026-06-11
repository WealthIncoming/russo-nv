import { Navigate, Outlet, useLocation, type RouteObject } from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { ScrollUpButton } from '@/components/ui/scroll-up-button';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import MaintenancePage from '@/components/pages/MaintenancePage';
import ServicesPage from '@/ServicesPage';
import IndustriesPage from '@/components/pages/IndustriesPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import SafetyPage from '@/components/pages/SafetyPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import { PrivacyPage, TermsPage } from '@/components/pages/LegalPage';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { detectLocale } from '@/lib/i18n/routes';

// Shared route configuration as plain data. Crucially this module instantiates
// NO router (no createBrowserRouter/createMemoryRouter), so it is safe to
// evaluate on the server — the router itself is built per-environment in
// Router.tsx (memory router on the server, browser router in the client).
export const basename = import.meta.env.BASE_NAME || '/';

function LanguageSync() {
  const location = useLocation();
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  useEffect(() => {
    const lang = detectLocale(location.pathname);
    setLanguage(lang);
  }, [location.pathname, setLanguage]);
  return null;
}

function Layout() {
  return (
    <>
      <LanguageSync />
      <ScrollToTop />
      <Outlet />
      <ScrollUpButton />
    </>
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
