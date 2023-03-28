import type { Message } from '@/core';

import styles from './index.module.less';

export interface MessageContentProps {
  data: Message;
}

export function MessageContent({ data }: MessageContentProps) {
  return (
    <div className={styles.message}>
      <div className={styles.content}>{data.content}</div>
    </div>
  );
}
