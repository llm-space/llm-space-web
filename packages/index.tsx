import { createRoot } from 'react-dom/client';

import { App } from '@/app';

import type { ChatProvider } from './core';
import { chatManager } from './core';
import { BELLEChatProvider } from './core/chatting/belle';
import { GPTChatProvider } from './core/chatting/gpt';

import './core/styles/index.less';
import config from '@/config.yaml';

for (const providerConfig of config.chatspace.providers) {
  let provider: ChatProvider | undefined;
  if (providerConfig.id === 'gpt-3.5-turbo') {
    provider = new GPTChatProvider();
  } else if (providerConfig.id === 'belle-gpt') {
    provider = new BELLEChatProvider();
  }
  if (!provider) {
    throw new Error(`Unsupported chat provider: ${providerConfig.id}`);
  }
  chatManager.registerChatProvider(provider);
  if (providerConfig.baseServiceURL) {
    provider.baseServiceURL = providerConfig.baseServiceURL;
  }
}

const rootElement = document.getElementById('llm-space-root');
if (!rootElement) {
  throw new Error('React mount point element #llm-space-root not found.');
}

const root = createRoot(rootElement);
root.render(<App />);
