import { createRoot } from 'react-dom/client';

import { App } from '@/app';

import type { ChatProvider } from './core';
import { chatManager } from './core';
import { BELLEChatProvider } from './core/chatting/belle';
import { GPTChatProvider } from './core/chatting/gpt';

import './core/styles/index.less';
import config from '@/config.yaml';

for (const providerConfig of config.chatting.providers) {
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
chatManager.loadFromLocalStorage();

const rootElement = document.getElementById('llmspace-root');
if (!rootElement) {
  throw new Error('React mount point element #llmspace-root not found.');
}

const root = createRoot(rootElement);
root.render(<App />);
