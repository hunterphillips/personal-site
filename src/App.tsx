import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import { serviceNowDocsCaseStudy } from './data/caseStudies';

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  if (pathname === serviceNowDocsCaseStudy.path) {
    return <CaseStudyPage caseStudy={serviceNowDocsCaseStudy} />;
  }

  return <HomePage />;
}
