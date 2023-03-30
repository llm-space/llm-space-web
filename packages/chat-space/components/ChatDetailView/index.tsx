import cn from 'classnames';
import { useCallback } from 'react';

import type { Chat, Message } from '@/core';

import { ChatDetailHeader } from '../ChatHeader';
import { MessageBox } from '../MessageBox';
import { MessageListView } from '../MessageListView';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
  data: Chat;
  onSend?: (message: Message) => void;
  onClear?: () => void;
}

export function ChatDetailView({ className, data, onSend, onClear }: ChatDetailViewProps) {
  const handleSendMessage = useCallback(
    (message: string) => {
      onSend?.(data.createUserMessage(message));
    },
    [data, onSend]
  );
  return (
    <div className={cn(styles.container, className)}>
      <ChatDetailHeader data={data} onClear={onClear} />
      <main className={styles.main}>
        <MessageListView className={styles.messageList} data={data.messages} />
        <MessageBox
          className={styles.messageBox}
          chat={data}
          showPrompts={data.messages.length == 0}
          onSend={handleSendMessage}
        />
      </main>
    </div>
  );
}
