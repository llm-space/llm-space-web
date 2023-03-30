import { uuid } from '../../utils';
import { AbstractChatProvider } from '../AbstractChatProvider';

import { GPTChat } from './GPTChat';

export class GPTChatProvider extends AbstractChatProvider {
  constructor() {
    super('gpt-3.5-turbo', 'GPT-3.5 Turbo');
  }

  async newChat(subject?: string) {
    const id = uuid();
    const chat = new GPTChat(id, subject);
    if (this.baseServiceURL) {
      chat.baseServiceURL = this.baseServiceURL;
    }
    return chat;
  }
}
