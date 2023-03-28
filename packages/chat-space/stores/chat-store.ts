import { proxy } from 'valtio';

import type { Chat, Message } from '@/core';

export interface ChatStore {
  chats: Chat[];
}

export const store = proxy<ChatStore>({
  chats: [],
});

export function addChat(chat: Chat) {
  store.chats.push(chat);
}

export function removeChat(chatId: string) {
  store.chats = store.chats.filter((chat) => chat.id !== chatId);
}

export function getChat(id: string) {
  return store.chats.find((chat) => chat.id === id);
}

export function pushMessage(message: Message) {
  const chat = getChat(message.chatId);
  if (chat) {
    chat.messages.push(message);
  }
}
