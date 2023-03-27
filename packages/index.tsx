import { createRoot } from 'react-dom/client';

import { App } from './ui';

import 'antd/dist/reset.css';

const rootElement = document.getElementById('llm-space-root');

if (!rootElement) {
  throw new Error('React mount point element #llm-space-root not found.');
}

const root = createRoot(rootElement);
root.render(<App />);
