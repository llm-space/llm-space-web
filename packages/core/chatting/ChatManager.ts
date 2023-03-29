import type { Chat } from './Chat';
import type { ChatProvider } from './ChatProvider';

export class ChatManager {
  readonly chats: Chat[] = [];
  readonly providers: ChatProvider[] = [];
  activeChatId: string | null = null;

  private readonly _providerMap = new Map<string, ChatProvider>();

  getChat(chatId: string) {
    return this.chats.find((chat) => chat.id === chatId) || null;
  }

  getActiveChat() {
    return this.activeChatId ? this.getChat(this.activeChatId) : null;
  }

  async newChat(provider: string): Promise<Chat> {
    const chatProvider = this._providerMap.get(provider);
    if (!chatProvider) {
      throw new Error(`No chat provider registered with id ${provider}`);
    }
    const chat = await chatProvider.newChat();
    return chat;
  }

  activateChat(chatId: string) {
    this.activeChatId = chatId;
  }

  addChat(chat: Chat) {
    this.chats.unshift(chat);
  }

  registerChatProvider(provider: ChatProvider) {
    this.providers.push(provider);
    this._providerMap.set(provider.id, provider);
  }
}
