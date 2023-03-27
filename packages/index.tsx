import { createRoot } from 'react-dom/client';

import { EntryPoint } from './ui';

import './index.less';

const rootElement = document.getElementById('llm-space-root');

if (!rootElement) {
  throw new Error('React mount point element #llm-space-root not found.');
}

const root = createRoot(rootElement);
root.render(<EntryPoint />);
