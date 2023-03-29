import Split from '@uiw/react-split';
import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

import type { Message } from '@/core';
import { ChatManager } from '@/core';
import { GPTChatProvider } from '@/core/chatting/gpt';

import { ChatDetailView } from '../components/ChatDetailView';
import { ChatListView } from '../components/ChatListView';

import styles from './index.module.less';

const chatManager = proxy(new ChatManager());
async function setup() {
  chatManager.registerChatProvider(new GPTChatProvider());
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
