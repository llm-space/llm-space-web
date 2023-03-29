import { Dropdown } from 'antd';
import cn from 'classnames';
import { useMemo } from 'react';

import type { Chat } from '@/core';

import { ProviderLogo } from '../ProviderLogo';

import styles from './index.module.less';

export interface ChatListViewProps {
  className?: string;
  selectionId: string | null;
  data: Chat[];
  onSelect?: (id: string) => void;
  onNewChat?: (provider: string) => void;
}

export function ChatListView({ className, selectionId, data, onSelect, onNewChat }: ChatListViewProps) {
  const menuProps = useMemo(
    () => ({
      items: [
        {
          key: 'gpt-3.5-turbo',
          label: 'GPT-3.5 Turbo',
        },
        {
          key: 'belle-7b-gptq',
          label: 'BELLE 7B GPTQ',
        },
        {
          key: 'stable-diffusion-2.1',
          label: 'Stable Diffusion 2.1',
        },
      ],
    }),
    []
  );
  const handleItemClick = (id: string) => {
    onSelect?.(id);
  };
  const handleNewChatButtonClick = async () => {
    onNewChat?.('gpt-3.5-turbo');
  };
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <h3>Chats</h3>
        <aside className={styles.headerButtons}>
          <Dropdown.Button className={styles.dropdownButton} menu={menuProps} onClick={handleNewChatButtonClick}>
            New Chat
          </Dropdown.Button>
        </aside>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}>
          {data.map((chat) => (
            <li
              key={chat.id}
              className={cn(styles.chat, { [styles.selected]: selectionId === chat.id })}
              onClick={() => handleItemClick(chat.id)}
            >
              <header>
                <ProviderLogo provider={chat.provider} />
                <h4>{chat.subject}</h4>
              </header>
              <div className={styles.lastMessageContent}>{chat.lastMessage?.content}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
