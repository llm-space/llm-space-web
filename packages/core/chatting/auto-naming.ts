import type { Chat } from '.';

import type { Message } from '../messaging';

import { chatManager } from './ChatManager';

let namingChat!: Chat;

export async function autoNameChatSubject(chatId: string, message: Message) {
  if (!namingChat) {
    namingChat = await chatManager.newChat('gpt-3.5-turbo', 'INTERNAL: naming');
  }
  const namingMessage = namingChat.createUserMessage('给下面的问题取一个简短的标题：\n\n' + message.content);
  await namingChat.sendMessage(namingMessage, {
    streamResponseCallback: (responseMessage) => {
      const currentChat = chatManager.getChat(chatId);
      if (currentChat) {
        currentChat.subject = responseMessage.content;
      }
    },
  });
}
