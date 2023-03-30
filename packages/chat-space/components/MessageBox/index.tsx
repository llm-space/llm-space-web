import { Input } from 'antd';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import type { Chat } from '@/core';

import { PromptExamples } from '../PromptExamples';

import styles from './index.module.less';

export interface MessageBoxProps {
  className?: string;
  chat: Chat;
  showPrompts?: boolean;
  onSend?: (message: string) => void;
}

export function MessageBox({ className, chat, showPrompts, onSend: onSend }: MessageBoxProps) {
  const [message, setMessage] = useState('');
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
  const handlePromptSelect = useCallback(
    (prompt: string) => {
      setMessage('');
      onSend?.(prompt);
    },
    [onSend]
  );
  return (
    <div className={cn(styles.container, className)}>
      <main className={styles.main}>
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
      </main>
      {showPrompts && <PromptExamples chatId={chat.id} className={styles.prompts} onSelect={handlePromptSelect} />}
    </div>
  );
}
