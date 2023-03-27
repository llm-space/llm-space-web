import cn from 'classnames';

import { App as ChatSpace } from '@/chat-space/app';

import { Avatar } from '../Avatar';
import { Logo } from '../Logo';

import styles from './index.module.less';

export interface WorkbenchProps {
  className?: string;
}

export function Workbench({ className }: WorkbenchProps) {
  return (
    <div className={cn(styles.container, className)}>
      <aside className={styles.sideBar}>
        <Logo />
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h2>ChatSpace</h2>
          </div>
          <aside className={styles.right}>
            <Avatar />
          </aside>
        </header>
        <main className={styles.content}>
          <ChatSpace />
        </main>
      </main>
    </div>
  );
}
