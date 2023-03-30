import { proxy } from 'valtio';

import type { Chat, ChatLike } from './Chat';
import type { ChatProvider } from './ChatProvider';

const CHATS_STORAGE_KEY = 'llmspace.chatting.chats';

export class ChatManager {
  readonly chats: Chat[] = [];
  readonly providers: ChatProvider[] = [];
  activeChatId: string | null = null;

  private readonly _providerMap = new Map<string, ChatProvider>();

  async loadFromLocalStorage() {
    const raw = localStorage.getItem(CHATS_STORAGE_KEY);
    if (raw) {
      const chatsJSON = JSON.parse(raw) as ChatLike[];
      for (const chatJSON of chatsJSON) {
        const provider = this.getProvider(chatJSON.provider);
        if (provider) {
          const chat = await provider.loadChat(chatJSON);
          this.chats.push(chat);
        }
      }
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(this.chats));
  }

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
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
  }

  registerChatProvider(provider: ChatProvider) {
    this.providers.push(provider);
    this._providerMap.set(provider.id, provider);
  }
}

export const chatManager = proxy(new ChatManager());
