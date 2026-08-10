import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ThemeProvider } from './ThemeContext';

export { caseStudies } from './data/caseStudies';
export { projects } from './data/projects';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <App initialPath={url} />
      </ThemeProvider>
    </StrictMode>,
  );
}
