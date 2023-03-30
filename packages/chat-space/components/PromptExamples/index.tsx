import cn from 'classnames';
import { useMemo } from 'react';

import styles from './index.module.less';
import config from '@/config.yaml';

export interface PromptExamplesProps {
  className?: string;
  chatId: string;
  onSelect?: (prompt: string) => void;
}

export function PromptExamples({ className, chatId, onSelect }: PromptExamplesProps) {
  const randomPrompts = useMemo(
    () => config.chatting.prompts.sort(() => Math.random() - 0.5).slice(0, 3),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatId]
  );
  return (
    <ul className={cn(styles.container, className)}>
      {randomPrompts.map((prompt, index) => (
        <li key={index} onClick={() => onSelect?.(prompt)}>
          {prompt}
        </li>
      ))}
    </ul>
  );
}
