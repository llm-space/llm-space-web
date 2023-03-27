import Split from '@uiw/react-split';

import styles from './index.module.less';

export function App() {
  return (
    <Split className={styles.container} lineBar>
      <nav className={styles.chatListContainer}>Chat List</nav>
      <main className={styles.chatDetailContainer}>Chat Detail</main>
      <aside className={styles.chatSettingsContainer}>Chat Settings</aside>
    </Split>
  );
}
