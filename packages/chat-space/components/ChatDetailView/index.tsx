import cn from 'classnames';

import type { Chat } from '@/core';

import { MessageBox } from '../MessageBox';
import { MessageListView } from '../MessageListView';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
  data: Chat;
}

export function ChatDetailView({ className, data }: ChatDetailViewProps) {
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <MessageListView className={styles.messageList} data={data.messages} />
        <MessageBox className={styles.messageBox} />
      </main>
    </div>
  );
}
