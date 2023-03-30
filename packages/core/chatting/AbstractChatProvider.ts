import type { Chat } from './Chat';
import type { ChatProvider } from './ChatProvider';

export abstract class AbstractChatProvider implements ChatProvider {
  baseServiceURL = '';

  constructor(readonly id: string, readonly name: string) {}

  abstract newChat(subject?: string): Promise<Chat>;
}
