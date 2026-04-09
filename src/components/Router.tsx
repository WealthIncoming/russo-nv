import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/ServicesPage';
import IndustriesPage from '@/components/pages/IndustriesPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import SafetyPage from '@/components/pages/SafetyPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import { useEffect, useMemo } from 'react';
import { useLanguageStore } from '@/lib/i18n/useLanguage';

// Layout component that includes ScrollToTop
function Layout() {
  const initializeLanguage = useLanguageStore((state) => state.initializeLanguage);
  
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "services",
        element: <ServicesPage />,
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "industries",
        element: <IndustriesPage />,
        routeMetadata: {
          pageIdentifier: 'industries',
        },
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        routeMetadata: {
          pageIdentifier: 'projects',
        },
      },
      {
        path: "safety",
        element: <SafetyPage />,
        routeMetadata: {
          pageIdentifier: 'safety',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
