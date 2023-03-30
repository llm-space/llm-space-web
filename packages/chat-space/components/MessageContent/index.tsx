import { Spin } from 'antd';
import cn from 'classnames';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Message } from '@/core';

import styles from './index.module.less';

export interface MessageContentProps {
  className?: string;
  data: Message;
}

export function MessageContent({ className, data }: MessageContentProps) {
  return (
    <div className={cn(styles.container, className)}>
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
