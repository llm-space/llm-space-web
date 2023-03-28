import cn from 'classnames';

import { MessageBox } from '../MessageBox';
import { MessageListView } from '../MessageListView';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
}

export function ChatDetailView({ className }: ChatDetailViewProps) {
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <MessageListView />
        <MessageBox className={styles.messageBox} />
      </main>
    </div>
  );
}
