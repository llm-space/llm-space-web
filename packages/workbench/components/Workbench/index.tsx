import cn from 'classnames';

import { App as ChatSpace } from '@/chat-space/app';

import { Avatar } from '../Avatar';
import { Logo } from '../Logo';
import { MainMenu } from '../MainMenu';

import styles from './index.module.less';

export interface WorkbenchProps {
  className?: string;
}

export function Workbench({ className }: WorkbenchProps) {
  return (
    <div className={cn(styles.container, className)}>
      <aside className={styles.sideBar}>
        <Logo />
        <MainMenu className={styles.mainMenu} />
        <Avatar />
      </aside>
      <main className={styles.main}>
        <ChatSpace />
      </main>
    </div>
  );
}
