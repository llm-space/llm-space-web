import { Input } from 'antd';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import styles from './index.module.less';

export interface MessageBoxProps {
  className?: string;
  onSend?: (message: string) => void;
}

export function MessageBox({ className, onSend: onSend }: MessageBoxProps) {
  const [message, setMessage] = useState('南京和北京有哪些区别？用表格输出');
  const [imeStatus, setImeStatus] = useState(false);
  const handleChange = useCallback((value: string) => {
    setMessage(value);
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.metaKey) {
        if (imeStatus) {
          setImeStatus(false);
          return;
        }
        e.preventDefault();
        if (message.trim()) {
          setMessage('');
          onSend?.(message.trim());
        }
      }
    },
    [imeStatus, message, onSend]
  );
  const handleIMEStart = useCallback(() => {
    setImeStatus(true);
  }, []);
  const handleIMEEnd = useCallback(() => {
    setImeStatus(false);
  }, []);
  return (
    <div className={cn(styles.container, className)}>
      <Input.TextArea
        autoSize
        className={styles.textarea}
        bordered={false}
        placeholder="Type your message here"
        value={message}
        onCompositionStartCapture={handleIMEStart}
        onCompositionEndCapture={handleIMEEnd}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
