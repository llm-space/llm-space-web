import { DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Tooltip } from 'antd';
import { Dropdown } from 'antd';
import cn from 'classnames';
import { useMemo, useState } from 'react';

import type { Chat } from '@/core';
import { chatManager } from '@/core';

import { ProviderIcon } from '../ProviderIcon';

import styles from './index.module.less';

export interface ChatListViewProps {
  className?: string;
  selectionId: string | null;
  data: Chat[];
  highlightNewChatButton?: boolean;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onNew?: (provider: string) => void;
}

export function ChatListView({
  className,
  selectionId,
  data,
  highlightNewChatButton,
  onSelect,
  onNew,
  onRemove: onDelete,
}: ChatListViewProps) {
  const [defaultProvider, setDefaultProvider] = useState(chatManager.providers[0].id);
  const menuProps = useMemo<MenuProps>(
    () => ({
      items: chatManager.providers.map((p) => ({
        key: p.id,
        label: p.name,
        onClick: () => {
          setDefaultProvider(p.id);
          onNew?.(p.id);
        },
      })),
    }),
    [onNew]
  );
  const handleItemClick = (id: string) => {
    onSelect?.(id);
  };
  const handleNew = async () => {
    onNew?.(defaultProvider);
  };
  const handleRemove = (id: string) => {
    onDelete?.(id);
  };
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <h3>Chats</h3>
        <aside className={styles.right}>
          <Dropdown.Button
            className={styles.dropdownButton}
            type={highlightNewChatButton ? 'primary' : undefined}
            menu={menuProps}
            onClick={handleNew}
          >
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
                <ProviderIcon provider={chat.provider} />
                <h4>{chat.subject ? chat.subject : 'New Chat'}</h4>
              </header>
              <div className={styles.lastMessageContent}>{chat.lastMessage?.content}</div>
              <Tooltip title="Remove chat">
                <Button
                  className={styles.removeButton}
                  icon={<DeleteOutlined />}
                  shape="circle"
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(chat.id);
                  }}
                ></Button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
