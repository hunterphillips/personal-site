import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import AppPolicyPage from './pages/AppPolicyPage';
import AppLandingPage from './pages/AppLandingPage';
import { caseStudies } from './data/caseStudies';
import { appLandingPages, appPolicyPages } from './data/apps';

export default function App({ initialPath }: { initialPath?: string }) {
  const [pathname, setPathname] = useState(
    () =>
      initialPath ??
      (typeof window === 'undefined' ? '/' : window.location.pathname),
  );

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const caseStudy = caseStudies.find((study) => study.path === pathname);

  if (caseStudy) {
    return <CaseStudyPage caseStudy={caseStudy} />;
  }

  const policyPage = appPolicyPages.find((page) => page.path === pathname);

  if (policyPage) {
    return <AppPolicyPage page={policyPage} />;
  }

  const landingPage = appLandingPages.find((page) => page.path === pathname);

  if (landingPage) {
    return <AppLandingPage page={landingPage} />;
  }

  return <HomePage />;
}
