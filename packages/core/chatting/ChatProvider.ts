import type { Chat } from '../types';

export interface ChatProvider {
  id: string;
  name: string;

  newChat(): Promise<Chat>;

  sendMessage(chatId: string, message: string): Promise<void>;
}
