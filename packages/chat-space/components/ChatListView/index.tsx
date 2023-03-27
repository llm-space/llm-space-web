import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import cn from 'classnames';

import styles from './index.module.less';

export interface ChatListViewProps {
  className?: string;
}

export function ChatListView({ className }: ChatListViewProps) {
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <h3>Chats</h3>
        <aside className={styles.headerButtons}>
          <Tooltip title="search">
            <Button icon={<PlusOutlined />}>New Chat</Button>
          </Tooltip>
        </aside>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}></ul>
      </main>
    </div>
  );
}
