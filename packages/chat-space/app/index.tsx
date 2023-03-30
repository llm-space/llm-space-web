import Split from '@uiw/react-split';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

import type { ChatManager, Message } from '@/core';
import { autoNameChatSubject, chatManager } from '@/core';

import { ChatDetailView } from '../components/ChatDetailView';
import { ChatListView } from '../components/ChatListView';

import styles from './index.module.less';

async function setup() {
  const chat = await chatManager.newChat(chatManager.providers[0].id);
  chatManager.addChat(chat);
  chatManager.activateChat(chat.id);
}
setup();

export function App() {
  const snapshot = useSnapshot(chatManager) as ChatManager;
  const handleChatListViewSelect = useCallback((id: string) => {
    chatManager.activateChat(id);
  }, []);
  const handleNewChat = useCallback(async (provider: string) => {
    const chat = await chatManager.newChat(provider);
    chatManager.addChat(chat);
    chatManager.activateChat(chat.id);
    // TODO: scroll to top
  }, []);
  const handleRemoveChat = useCallback(async (chatId: string) => {
    const chat = chatManager.getChat(chatId);
    if (chat) {
      const active = chatManager.activeChatId === chatId;
      const chatIndex = chatManager.chats.indexOf(chat);
      chatManager.removeChat(chatId);
      if (active) {
        setTimeout(() => {
          if (chatManager.chats.length > 0) {
            let nextChat = chatManager.chats[chatIndex];
            if (!nextChat) {
              nextChat = chatManager.chats[chatIndex - 1];
            }
            chatManager.activateChat(nextChat.id);
          }
        }, 0);
      }
      // TODO: scroll to top
    }
  }, []);
  const handleClearChat = useCallback(async () => {
    const chat = chatManager.getActiveChat();
    if (chat) {
      chat.clearMessages();
    }
  }, []);
  const handleSend = useCallback(async (message: Message) => {
    const chat = chatManager.getActiveChat();
    if (chat) {
      const autoNaming = chat.messages.length === 0 && chat.subject === '';
      if (autoNaming) {
        autoNameChatSubject(chat.id, message);
      }
      await chat.sendMessage(message);
    }
  }, []);
  const activeChat = snapshot.getActiveChat();
  return (
    <Split className={styles.container} lineBar>
      <nav className={styles.chatListContainer}>
        <ChatListView
          selectionId={snapshot.activeChatId}
          data={snapshot.chats}
          highlightNewChatButton={snapshot.chats.length === 0}
          onSelect={handleChatListViewSelect}
          onNew={handleNewChat}
          onRemove={handleRemoveChat}
        />
      </nav>
      <main className={styles.chatDetailContainer}>
        {activeChat && <ChatDetailView data={activeChat} onSend={handleSend} onClear={handleClearChat} />}
      </main>
      <aside className={styles.chatSettingsContainer}></aside>
    </Split>
  );
}
