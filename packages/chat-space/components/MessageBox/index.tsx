import { Input } from 'antd';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import styles from './index.module.less';

export interface MessageBoxProps {
  className?: string;
  onSend?: (message: string) => void;
}

export function MessageBox({ className, onSend: onSend }: MessageBoxProps) {
  const [message, setMessage] = useState('');
  const handleChange = useCallback((value: string) => {
    setMessage(value);
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        if (message) {
          setMessage('');
        }
        onSend?.(message.trim());
      }
    },
    [message, onSend]
  );
  return (
    <div className={cn(styles.container, className)}>
      <Input.TextArea
        autoSize
        className={styles.textarea}
        bordered={false}
        placeholder="Type your message here"
        value={message}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
