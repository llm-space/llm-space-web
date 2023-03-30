import { proxy } from 'valtio';

import { BELLEChatProvider } from './belle';
import type { Chat } from './Chat';
import type { ChatProvider } from './ChatProvider';
import { GPTChatProvider } from './gpt';

export class ChatManager {
  readonly chats: Chat[] = [];
  readonly providers: ChatProvider[] = [];
  activeChatId: string | null = null;

  private readonly _providerMap = new Map<string, ChatProvider>();

  getChat(chatId: string) {
    return this.chats.find((chat) => chat.id === chatId) || null;
  }

  getProvider(providerId: string) {
    return this._providerMap.get(providerId) || null;
  }

  getProviderName(providerId: string) {
    const provider = this.getProvider(providerId);
    return provider ? provider.name : null;
  }

  getActiveChat() {
    return this.activeChatId ? this.getChat(this.activeChatId) : null;
  }

  async newChat(provider: string, subject?: string): Promise<Chat> {
    const chatProvider = this._providerMap.get(provider);
    if (!chatProvider) {
      throw new Error(`No chat provider registered with id ${provider}`);
    }
    const chat = await chatProvider.newChat(subject);
    return chat;
  }

  activateChat(chatId: string) {
    this.activeChatId = chatId;
  }

  addChat(chat: Chat) {
    this.chats.unshift(chat);
  }

  removeChat(chatId: string) {
    const chat = this.getChat(chatId);
    if (!chat) {
      return;
    }
    const index = this.chats.indexOf(chat);
    if (index >= 0) {
      this.chats.splice(index, 1);
    }
  }

  registerChatProvider(provider: ChatProvider) {
    this.providers.push(provider);
    this._providerMap.set(provider.id, provider);
  }
}

export const chatManager = proxy(new ChatManager());
chatManager.registerChatProvider(new GPTChatProvider());
chatManager.registerChatProvider(new BELLEChatProvider());
