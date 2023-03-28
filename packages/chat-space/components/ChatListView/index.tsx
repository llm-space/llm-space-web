import { Dropdown } from 'antd';
import cn from 'classnames';

import type { Chat } from '@/core';

import { ProviderLogo } from '../ProviderLogo';

import styles from './index.module.less';

export interface ChatListViewProps {
  className?: string;
}

export function ChatListView({ className }: ChatListViewProps) {
  const menuProps = {
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
  };
  const data: Chat[] = [
    {
      id: '1',
      provider: 'gpt-3.5-turbo',
      subject: '橙色食物菜谱',
      messages: [],
      lastMessage: {
        id: '3',
        chatId: '1',
        sender: { role: 'assistant' },
        contentType: 'text/markdown',
        content:
          '橙色食物有很多种类，比如胡萝卜、南瓜、芒果、木瓜、柑橘、红薯等1。这些食物都富含胡萝卜素，可以转化成维生素A，有助于保持良好的视力和免疫力2。你可以根据你孩子的喜好，用这些食物做一些美味的菜肴，比如南瓜饼、胡萝卜汤、木瓜牛奶、芒果冰淇淋等。',
      },
    },
    {
      id: '2',
      provider: 'stable-diffusion-2.1',
      subject: '画一个胡萝卜',
      messages: [],
      lastMessage: {
        id: '3',
        sender: { role: 'assistant' },
        contentType: 'text/markdown',
        content: '橙色, 胡萝卜, 美食',
      },
    },
  ];
  const selectionId = '1';
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <h3>Chats</h3>
        <aside className={styles.headerButtons}>
          <Dropdown.Button className={styles.dropdownButton} menu={menuProps}>
            New Chat
          </Dropdown.Button>
        </aside>
      </header>
      <main className={styles.main}>
        <ul className={styles.list}>
          {data.map((chat) => (
            <li key={chat.id} className={cn(styles.chat, { [styles.selected]: selectionId === chat.id })}>
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
