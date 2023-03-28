import Split from '@uiw/react-split';

import { ChatDetailView } from '../components/ChatDetailView';
import { ChatListView } from '../components/ChatListView';

import styles from './index.module.less';

export function App() {
  return (
    <Split className={styles.container} lineBar>
      <nav className={styles.chatListContainer}>
        <ChatListView />
      </nav>
      <main className={styles.chatDetailContainer}>
        <ChatDetailView />
      </main>
      <aside className={styles.chatSettingsContainer}></aside>
    </Split>
  );
}
