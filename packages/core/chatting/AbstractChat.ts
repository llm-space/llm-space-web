import { v4 as uuid } from 'uuid';

import type { Message, MessageContentType } from '../messaging';

import type { Chat, SendMessageOptions } from './Chat';

export abstract class AbstractChat implements Chat {
  readonly messages: Message[] = [];
  lastMessage?: Message;

  constructor(readonly provider: string, readonly id: string, public subject = '') {}

  createUserMessage(content: string, contentType: MessageContentType = 'text/markdown'): Message {
    const id = uuid();
    return {
      id: id,
      chatId: this.id,
      sender: {
        role: 'user',
      },
      contentType,
      content,
    };
  }

  abstract sendMessage(message: Message, options?: SendMessageOptions): Promise<void>;

  clearMessages() {
    this.messages.splice(0, this.messages.length);
  }

  protected appendMessage(message: Message) {
    this.messages.push(message);
    this.lastMessage = message;
  }
}
