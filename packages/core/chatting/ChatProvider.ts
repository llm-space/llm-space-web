import type { Chat } from './Chat';

export interface ChatProvider {
  id: string;
  name: string;
  baseServiceURL?: string;

  newChat(subject?: string): Promise<Chat>;
}
