import type { Chat, ChatLike } from './Chat';

export interface ChatProvider {
  id: string;
  name: string;
  baseServiceURL: string;

  newChat(subject?: string): Promise<Chat>;

  loadChat(chat: ChatLike): Promise<Chat>;
}
