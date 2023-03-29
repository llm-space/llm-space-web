import { v4 as uuid } from 'uuid';

import { AbstractChatProvider } from '../AbstractChatProvider';

import { GPTChat } from './GPTChat';

export class GPTChatProvider extends AbstractChatProvider {
  constructor() {
    super('gpt-3.5-turbo', 'GPT-3.5 Turbo');
  }

  async newChat() {
    const id = uuid();
    const chat = new GPTChat(id);
    return chat;
  }
}
