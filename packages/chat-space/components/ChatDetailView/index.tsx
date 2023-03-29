import cn from 'classnames';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import type { Chat, Message } from '@/core';

import { MessageBox } from '../MessageBox';
import { MessageListView } from '../MessageListView';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
  data: Chat;
  onSend?: (message: Message) => void;
}

export function ChatDetailView({ className, data, onSend }: ChatDetailViewProps) {
  const handleSendMessage = useCallback(
    (message: string) => {
      onSend?.({
        id: uuid(),
        chatId: data.id,
        sender: {
          role: 'user',
        },
        contentType: 'text/markdown',
        content: message,
      });
    },
    [data.id, onSend]
  );
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <MessageListView className={styles.messageList} data={data.messages} />
        <MessageBox className={styles.messageBox} onSend={handleSendMessage} />
      </main>
    </div>
  );
}
