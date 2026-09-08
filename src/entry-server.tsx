import { renderToString } from 'react-dom/server';
import App from './App';
export { routes, pageMeta, company, articles } from './content';
export function render(path: string) { return renderToString(<App path={path} />); }
