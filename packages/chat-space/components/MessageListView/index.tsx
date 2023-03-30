import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import type { Message } from '@/core';

import { MessageContent } from '../MessageContent';

import styles from './index.module.less';

export interface MessageListViewProps {
  className?: string;
  data: Message[];
}

export function MessageListView({ className, data }: MessageListViewProps) {
  const [autoScroll, setAutoScroll] = useState(true);
  useEffect(() => {
    if (data.length > 0) {
      const lastMessage = data[data.length - 1];
      if ((lastMessage.sender.role === 'assistant' && autoScroll) || lastMessage.sender.role === 'user') {
        setAutoScroll(true);
        const element = document.querySelector(`.llmspace-chat-message-bubble#${lastMessage.id}`);
        setTimeout(() => {
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            });
          }
        }, 0);
      }
    }
  }, [autoScroll, data]);
  const handleScroll = useCallback((event: React.UIEvent) => {
    const scrollable = event.target as HTMLElement;
    if (scrollable) {
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      // Set auto scroll true if scroll to bottom
      const isScrollToBottom = scrollTop + clientHeight >= scrollHeight;
      setAutoScroll(isScrollToBottom);
    }
  }, []);
  return (
    <div className={cn(styles.container, className)} onWheel={handleScroll}>
      <ul className={styles.list}>
        {data.map((message) => (
          <li
            key={message.id}
            id={message.id}
            className={cn('llmspace-chat-message-bubble', styles.bubble, {
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
