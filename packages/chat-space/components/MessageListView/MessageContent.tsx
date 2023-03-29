import { Spin } from 'antd';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Message } from '@/core';

import styles from './index.module.less';

export interface MessageContentProps {
  data: Message;
}

export function MessageContent({ data }: MessageContentProps) {
  return (
    <div className={styles.message}>
      <div className={styles.content}>
        {data.sender.role === 'assistant' && data.content === '' ? (
          <Spin size="small" />
        ) : (
          <Markdown className={styles.markdown} remarkPlugins={[remarkGfm]}>
            {data.content}
          </Markdown>
        )}
      </div>
    </div>
  );
}
