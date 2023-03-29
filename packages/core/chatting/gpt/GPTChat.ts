import { v4 as uuid } from 'uuid';

import type { Message } from '../../messaging';
import { AbstractChat } from '../AbstractChat';

const BASE_API_URL = '//localhost:3000/api';

export class GPTChat extends AbstractChat {
  constructor(readonly id: string, subject?: string) {
    super('gpt-3.5-turbo', id, subject);
  }

  async sendMessage(message: Message) {
    const messagesSnapshot = [...this.messages, message];
    this.messages.push(message);
    const res = await fetch(`${BASE_API_URL}/openai/chat/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messagesSnapshot,
      }),
    });
    const content = await res.text();
    const responseMessage: Message = {
      id: uuid(),
      chatId: message.chatId,
      sender: {
        role: 'assistant',
      },
      contentType: 'text/markdown',
      content,
    };
    this.messages.push(responseMessage);
  }
}
