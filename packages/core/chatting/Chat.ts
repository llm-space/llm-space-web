import type { Message } from '../messaging/Message';

export interface SendMessageOptions {
  streamResponseCallback: (message: Message) => void;
}

export interface ChatLike {
  id: string;
  provider: string;
  baseServiceURL: string;
  subject: string;
  messages: Message[];
}

export interface Chat extends ChatLike {
  lastMessage: Message | null;

  createUserMessage(content: string, contentType?: string): Message;
  sendMessage(message: Message, options?: SendMessageOptions): Promise<void>;
  clearMessages(): void;
}
