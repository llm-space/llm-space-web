import type { Message } from '../messaging/Message';

export interface Chat {
  id: string;
  provider: string;
  subject: string;
  messages: Message[];
  lastMessage?: Message;

  sendMessage(message: Message): Promise<void>;
}
