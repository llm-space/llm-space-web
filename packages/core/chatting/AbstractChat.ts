import type { Message, MessageContentType } from '../messaging';
import { uuid } from '../utils';

import type { Chat, SendMessageOptions } from './Chat';

export abstract class AbstractChat implements Chat {
  readonly messages: Message[] = [];
  baseServiceURL = '';
  lastMessage: Message | null = null;

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
    this.lastMessage = null;
  }

  protected appendMessage(message: Message) {
    this.messages.push(message);
    this.lastMessage = message;
  }
}
