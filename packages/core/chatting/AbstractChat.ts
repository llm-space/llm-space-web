import type { Message } from '../messaging';

import type { Chat } from './Chat';

export abstract class AbstractChat implements Chat {
  readonly messages: Message[] = [];
  lastMessage?: Message;

  constructor(readonly provider: string, readonly id: string, public subject = 'New Chat') {}

  abstract sendMessage(message: Message): Promise<void>;

  protected appendMessage(message: Message) {
    this.messages.push(message);
    this.lastMessage = message;
  }
}
