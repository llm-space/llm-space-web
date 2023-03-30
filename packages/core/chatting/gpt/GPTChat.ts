import { v4 as uuid } from 'uuid';

import type { Message } from '../../messaging';
import { AbstractChat } from '../AbstractChat';
import type { SendMessageOptions } from '../Chat';

const BASE_API_URL = '//localhost:3000';

export class GPTChat extends AbstractChat {
  constructor(readonly id: string, subject?: string) {
    super('gpt-3.5-turbo', id, subject);
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  async sendMessage(message: Message, options?: SendMessageOptions) {
    const messagesSnapshot = [...this.messages, message];
    this.appendMessage(message);

    const messageId = uuid();
    let streamingMessage: Message | undefined = {
      id: messageId,
      chatId: message.chatId,
      sender: {
        role: 'assistant',
      },
      contentType: 'text/markdown',
      content: '',
    };
    this.appendMessage(streamingMessage);

    const res = await fetch(`${BASE_API_URL}/api/openai/chat/completion?stream=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messagesSnapshot,
      }),
    });
    if (res.body) {
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        const textValue = value?.toString().replace(/\n\ndata:\s/g, '');
        const extractedValue = textValue?.substr(6, textValue.length - 6 - 2) ?? '';
        if (extractedValue) {
          streamingMessage = this.getMessage(messageId);
          if (streamingMessage) {
            streamingMessage.content += extractedValue;
            options?.streamResponseCallback?.(streamingMessage);
          }
        }
        if (done) {
          break;
        }
      }
    }
  }
}
