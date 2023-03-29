import type { Message } from '../messaging/Message';

export interface SendMessageOptions {
  streamResponseCallback: (message: Message) => void;
}

export interface Chat {
  id: string;
  provider: string;
  subject: string;
  messages: Message[];
  lastMessage?: Message;

  createUserMessage(content: string, contentType?: string): Message;
  sendMessage(message: Message, options?: SendMessageOptions): Promise<void>;
  clearMessages(): void;
}
