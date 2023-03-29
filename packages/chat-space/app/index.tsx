import Split from '@uiw/react-split';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

import { chatManager } from '@/core/chatting';

import { ChatDetailView } from '../components/ChatDetailView';
import { ChatListView } from '../components/ChatListView';
import { chatStore } from '../stores';
import type { ChatStore } from '../stores/chat-store';
import { addChat } from '../stores/chat-store';
import { selectChat } from '../stores/chat-store';
import { getChat } from '../stores/chat-store';

import styles from './index.module.less';

export function App() {
  const chatSnapshot = useSnapshot<ChatStore>(chatStore) as ChatStore;
  const handleChatListViewSelect = useCallback((id: string) => {
    selectChat(id);
  }, []);
  const handleNewChat = useCallback(async (provider: string) => {
    const chat = await chatManager.newChat(provider);
    addChat(chat);
    selectChat(chat.id);
  }, []);
  const selectedChat = chatSnapshot.selectedChatId ? getChat(chatSnapshot.selectedChatId) : null;
  return (
    <Split className={styles.container} lineBar>
      <nav className={styles.chatListContainer}>
        <ChatListView
          selectionId={chatSnapshot.selectedChatId}
          data={chatSnapshot.chats}
          onSelect={handleChatListViewSelect}
          onNewChat={handleNewChat}
        />
      </nav>
      <main className={styles.chatDetailContainer}>{selectedChat && <ChatDetailView data={selectedChat} />}</main>
      <aside className={styles.chatSettingsContainer}></aside>
    </Split>
  );
}
