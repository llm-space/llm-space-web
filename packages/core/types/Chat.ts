import type { Message } from './Message';

export interface Chat {
  id: string;
  provider: string;
  subject: string;
  messages: Message[];
  lastMessage?: Message;
}
