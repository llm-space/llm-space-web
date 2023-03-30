import type { Chat, ChatLike } from './Chat';
import type { ChatProvider } from './ChatProvider';

export abstract class AbstractChatProvider implements ChatProvider {
  baseServiceURL = '';

  constructor(readonly id: string, readonly name: string) {}

  abstract newChat(subject?: string): Promise<Chat>;

  async loadChat(chatLike: ChatLike): Promise<Chat> {
    const chat = await this.newChat(chatLike.subject);
    chat.id = chatLike.id;
    chat.baseServiceURL = chatLike.baseServiceURL;
    chat.messages = chatLike.messages;
    if (chat.messages) {
      chat.lastMessage = chat.messages[chat.messages.length - 1] || null;
    }
    return chat;
  }
}
