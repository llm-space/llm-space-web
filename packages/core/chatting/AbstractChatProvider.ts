import EventEmitter from 'eventemitter3';
import { v4 as uuid } from 'uuid';

import type { Chat, Message } from '../types';

import type { ChatProvider, ChatProviderEvents } from './ChatProvider';

export abstract class AbstractChatProvider extends EventEmitter<ChatProviderEvents> implements ChatProvider {
  readonly id: string;
  readonly name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  newChat(): Promise<Chat> {
    const id = uuid();
    return Promise.resolve({
      id,
      // subject: `New Chat #${id.substring(id.length - 4)}`,
      subject: 'New Chat',
      provider: this.id,
      messages: [],
    });
  }

  abstract sendMessage(message: Message, history?: Message[]): Promise<void>;
}
