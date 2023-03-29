import type { Chat } from './Chat';

export interface ChatProvider {
  id: string;
  name: string;

  newChat(subject?: string): Promise<Chat>;
}
