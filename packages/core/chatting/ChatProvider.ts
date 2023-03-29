import type { EventEmitter } from 'eventemitter3';

import type { Chat, Message } from '../types';

export interface ChatProviderEvents {
  message: (message: Message) => void;
  partialMessage: (message: Message) => void;
}

export interface ChatProvider extends EventEmitter<ChatProviderEvents> {
  id: string;
  name: string;

  newChat(): Promise<Chat>;

  sendMessage(message: Message, history?: Message[]): Promise<void>;
}
