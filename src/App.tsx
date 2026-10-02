import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';

// Lazy-loaded page components for optimal production bundle splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ExplorePage = lazy(() => import('./pages/ExplorePage').then(m => ({ default: m.ExplorePage })));
const CountriesPage = lazy(() => import('./pages/CountriesPage').then(m => ({ default: m.CountriesPage })));
const CountryDetailPage = lazy(() => import('./pages/CountryDetailPage').then(m => ({ default: m.CountryDetailPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then(m => ({ default: m.MethodologyPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Scroll to top upon navigating to a new route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Minimal, accessible loading fallback
function PageLoadingFallback() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-2">
      <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
      <span className="text-xs font-mono">Loading data view...</span>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="countries" element={<CountriesPage />} />
            <Route path="countries/:countryId" element={<CountryDetailPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="insights/:insightId" element={<InsightsPage />} />
            <Route path="methodology" element={<MethodologyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
