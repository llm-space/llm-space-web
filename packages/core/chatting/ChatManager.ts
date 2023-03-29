import type { Chat } from '../types';

import type { ChatProvider } from './ChatProvider';

export class ChatManager {
  readonly providers = new Map<string, ChatProvider>();

  async newChat(provider: string): Promise<Chat> {
    const chatProvider = this.providers.get(provider);
    if (!chatProvider) {
      throw new Error(`No chat provider registered with id ${provider}`);
    }
    const chat = await chatProvider.newChat();
    return chat;
  }

  registerChatProvider(provider: ChatProvider) {
    this.providers.set(provider.id, provider);
  }
}
