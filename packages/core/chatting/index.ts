import { ChatManager } from './ChatManager';
import { GPTChatProvider } from './gpt';

export * from './AbstractChatProvider';
export * from './ChatManager';
export * from './ChatProvider';

export const chatManager = new ChatManager();
chatManager.registerChatProvider(new GPTChatProvider());
