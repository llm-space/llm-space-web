import { uuid } from '@/core/utils';

import type { Message } from '../../messaging';
import { AbstractChat } from '../AbstractChat';
import { chatManager } from '../ChatManager';

export class BELLEChat extends AbstractChat {
  constructor(readonly id: string, subject?: string) {
    super('belle-gptq', id, subject);
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  async sendMessage(message: Message) {
    const messagesSnapshot = [...this.messages, message];
    this.appendMessage(message);
    let responseMessage: Message | undefined = {
      id: uuid(),
      chatId: message.chatId,
      sender: {
        role: 'assistant',
      },
      contentType: 'text/markdown',
      content: '',
    };
    this.appendMessage(responseMessage);
    const res = await fetch(`${this.baseServiceURL}/api/belle/chat/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messagesSnapshot,
      }),
    });
    const content = await res.text();
    responseMessage = this.getMessage(responseMessage.id);
    if (responseMessage) {
      responseMessage.content = content;
    }
    chatManager.saveToLocalStorage();
  }
}
