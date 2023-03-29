import { v4 as uuid } from 'uuid';

import type { Message } from '@/core/types';

import { AbstractChatProvider } from '../AbstractChatProvider';

const BASE_API_URL = '//localhost:3000/api';

export class GPTChatProvider extends AbstractChatProvider {
  constructor() {
    super('gpt-3.5-turbo', 'GPT-3.5 Turbo');
  }

  async sendMessage(message: Message, history: Message[] = []) {
    this.emit('message', message);
    const messages = [...history, message];
    const res = await fetch(`${BASE_API_URL}/openai/chat/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
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
    this.emit('message', responseMessage);
  }
}
