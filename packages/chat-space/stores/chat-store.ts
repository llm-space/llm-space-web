import { proxy } from 'valtio';

import type { Chat, Message } from '@/core';

export interface ChatStore {
  selectedChatId: string | null;
  chats: Chat[];
}

export const store = proxy<ChatStore>({
  selectedChatId: '1',
  chats: [
    {
      id: '1',
      provider: 'gpt-3.5-turbo',
      subject: '橙色食物菜谱',
      messages: [
        {
          id: '1',
          chatId: '1',
          sender: { role: 'assistant' },
          contentType: 'text/markdown',
          content: '我们来查找答案并聊会天。我可以为你做什么？',
        },
        {
          id: '2',
          chatId: '1',
          sender: { role: 'user' },
          contentType: 'text/markdown',
          content: '我可以为我挑剔的只吃橙色食物的孩子做什么饭?',
        },
        {
          id: '3',
          chatId: '1',
          sender: { role: 'assistant' },
          contentType: 'text/markdown',
          content:
            '橙色食物有很多种类，比如胡萝卜、南瓜、芒果、木瓜、柑橘、红薯等1。这些食物都富含胡萝卜素，可以转化成维生素A，有助于保持良好的视力和免疫力2。你可以根据你孩子的喜好，用这些食物做一些美味的菜肴，比如南瓜饼、胡萝卜汤、木瓜牛奶、芒果冰淇淋等。',
        },
      ],
      lastMessage: {
        id: '3',
        chatId: '1',
        sender: { role: 'assistant' },
        contentType: 'text/markdown',
        content:
          '橙色食物有很多种类，比如胡萝卜、南瓜、芒果、木瓜、柑橘、红薯等1。这些食物都富含胡萝卜素，可以转化成维生素A，有助于保持良好的视力和免疫力2。你可以根据你孩子的喜好，用这些食物做一些美味的菜肴，比如南瓜饼、胡萝卜汤、木瓜牛奶、芒果冰淇淋等。',
      },
    },
    {
      id: '2',
      provider: 'stable-diffusion-2.1',
      subject: '画一个胡萝卜',
      messages: [],
      lastMessage: {
        id: '3',
        chatId: '2',
        sender: { role: 'assistant' },
        contentType: 'text/markdown',
        content: '橙色, 胡萝卜, 美食',
      },
    },
  ],
});

export function getChat(id: string) {
  return store.chats.find((chat) => chat.id === id);
}

export function addChat(chat: Chat) {
  store.chats.push(chat);
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
