import { proxy } from 'valtio';

import type { Chat, Message } from '@/core';

export interface ChatStore {
  selectedChatId: string | null;
  chats: Chat[];
}

export const store = proxy<ChatStore>({
  selectedChatId: '1',
  chats: [],
});

export function getChat(id: string) {
  return store.chats.find((chat) => chat.id === id);
}

export function addChat(chat: Chat) {
  store.chats.unshift(chat);
}

export function removeChat(chatId: string) {
  store.chats = store.chats.filter((chat) => chat.id !== chatId);
}

export function selectChat(chatId: string) {
  store.selectedChatId = chatId;
}

export function pushMessage(message: Message) {
  const chat = getChat(message.chatId);
  if (chat) {
    chat.messages.push(message);
  }
}
