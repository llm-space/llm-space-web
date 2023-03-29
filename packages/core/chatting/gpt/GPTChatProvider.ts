import EventEmitter from 'eventemitter3';

import type { Message } from '@/core/types';

export interface GPTChatProviderEvents {
  message: (message: Message) => void;
  partialMessage: (message: Message) => void;
}

export class GPTChatProvider extends EventEmitter<GPTChatProviderEvents> {
  constructor() {
    super();
  }

  async createNew() {}

  async sendMessage(message: Message, history: Message[]) {}
}
