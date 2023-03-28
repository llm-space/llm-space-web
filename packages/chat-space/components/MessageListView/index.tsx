import cn from 'classnames';

import type { Message } from '@/core';

import { MessageContent } from './MessageContent';

import styles from './index.module.less';

export interface MessageListViewProps {
  className?: string;
}

export function MessageListView({ className }: MessageListViewProps) {
  const data: Message[] = [
    {
      id: '1',
      chatId: '1',
      sender: { role: 'assistant' },
      contentType: 'text/markdown',
      content: '我们来查找答案并聊会天。我可以为你做什么？',
    },
    {
      id: '2',
      chatId: '1',
      sender: { role: 'user' },
      contentType: 'text/markdown',
      content: '我可以为我挑剔的只吃橙色食物的孩子做什么饭?',
    },
    {
      id: '3',
      chatId: '1',
      sender: { role: 'assistant' },
      contentType: 'text/markdown',
      content:
        '橙色食物有很多种类，比如胡萝卜、南瓜、芒果、木瓜、柑橘、红薯等1。这些食物都富含胡萝卜素，可以转化成维生素A，有助于保持良好的视力和免疫力2。你可以根据你孩子的喜好，用这些食物做一些美味的菜肴，比如南瓜饼、胡萝卜汤、木瓜牛奶、芒果冰淇淋等。',
    },
  ];
  return (
    <div className={cn(styles.container, className)}>
      <ul className={styles.list}>
        {data.map((message) => (
          <li
            key={message.id}
            className={cn(styles.bubble, {
              [styles.incoming]: message.sender.role === 'assistant',
              [styles.outgoing]: message.sender.role === 'user',
            })}
          >
            <MessageContent data={message} />
          </li>
        ))}
      </ul>
    </div>
  );
}
