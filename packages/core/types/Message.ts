export type MessageContentType = 'text/markdown';

export interface Message {
  id: string;
  sender: MessageSender;
  contentType: MessageContentType;
  content: string;
}

export interface MessageSender {
  role: string;
}
