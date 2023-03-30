import { uuid } from '@/core/utils';

import { AbstractChatProvider } from '../AbstractChatProvider';

import { BELLEChat } from './BELLEChat';

export class BELLEChatProvider extends AbstractChatProvider {
  constructor() {
    super('belle-gptq', 'BELLE-7B-2M');
  }

  async newChat(subject?: string) {
    const id = uuid();
    const chat = new BELLEChat(id, subject);
    if (this.baseServiceURL) {
      chat.baseServiceURL = this.baseServiceURL;
    }
    return chat;
  }
}
