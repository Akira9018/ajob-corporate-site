import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { pageMeta } from './content';
const path = window.location.pathname.replace(/\/+$/, '') + '/';
const meta = pageMeta(path);
document.title = meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
const element = <StrictMode>
  <App path={path} />
</StrictMode>;
const root = document.getElementById('root')!;
if (root.hasChildNodes())
  hydrateRoot(root, element);
else
  createRoot(root).render(element);
