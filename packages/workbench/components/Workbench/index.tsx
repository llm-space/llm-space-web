import cn from 'classnames';

import { App as ChatSpace } from '@/chat-space/app';

import styles from './index.module.less';

export interface WorkbenchProps {
  className?: string;
}

export function Workbench({ className }: WorkbenchProps) {
  return (
    <div className={cn(styles.container, className)}>
      <aside className={styles.sideBar}></aside>
      <main className={styles.main}>
        <header className={styles.header}></header>
        <main className={styles.content}>
          <ChatSpace />
        </main>
      </main>
    </div>
  );
}
