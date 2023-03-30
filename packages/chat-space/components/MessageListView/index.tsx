import cn from 'classnames';

import type { Message } from '@/core';

import { MessageContent } from '../MessageContent';

import styles from './index.module.less';

export interface MessageListViewProps {
  className?: string;
  data: Message[];
}

export function MessageListView({ className, data }: MessageListViewProps) {
  return (
    <div className={cn(styles.container, className)}>
      <ul className={styles.list}>
        {data.map((message) => (
          <li
            key={message.id}
            className={cn(styles.bubble, {
              [styles.incoming]: message.sender.role === 'assistant',
              [styles.outgoing]: message.sender.role === 'user',
            })}
          >
            <MessageContent data={message} />
          </li>
        ))}
      </ul>
    </div>
  );
}
