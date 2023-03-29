import Split from '@uiw/react-split';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

import type { ChatManager, Message } from '@/core';
import { chatManager, nameChatSubject } from '@/core';

import { ChatDetailView } from '../components/ChatDetailView';
import { ChatListView } from '../components/ChatListView';

import styles from './index.module.less';

async function setup() {
  const chat = await chatManager.newChat('gpt-3.5-turbo');
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
  const handleSend = useCallback(async (message: Message) => {
    const chat = chatManager.getActiveChat();
    if (chat) {
      const autoNaming = chat.messages.length === 0 && chat.subject === '';
      if (autoNaming) {
        nameChatSubject(chat.id, message);
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
          onSelect={handleChatListViewSelect}
          onNewChat={handleNewChat}
        />
      </nav>
      <main className={styles.chatDetailContainer}>
        {activeChat && <ChatDetailView data={activeChat} onSend={handleSend} />}
      </main>
      <aside className={styles.chatSettingsContainer}></aside>
    </Split>
  );
}
