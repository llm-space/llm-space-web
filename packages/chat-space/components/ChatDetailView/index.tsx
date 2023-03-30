import { ClearOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import cn from 'classnames';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import type { Chat, Message } from '@/core';
import { chatManager } from '@/core';

import { MessageBox } from '../MessageBox';
import { MessageListView } from '../MessageListView';
import { ProviderIcon } from '../ProviderIcon';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
  data: Chat;
  onSend?: (message: Message) => void;
  onClear?: () => void;
}

export function ChatDetailView({ className, data, onSend, onClear }: ChatDetailViewProps) {
  const handleSendMessage = useCallback(
    (message: string) => {
      onSend?.({
        id: uuid(),
        chatId: data.id,
        sender: {
          role: 'user',
        },
        contentType: 'text/markdown',
        content: message,
      });
    },
    [data.id, onSend]
  );
  return (
    <div className={cn(styles.container, className)}>
      <header className={styles.header}>
        <ChatDetailHeader data={data} onClear={onClear} />
      </header>
      <main className={styles.main}>
        <MessageListView className={styles.messageList} data={data.messages} />
        <MessageBox
          className={styles.messageBox}
          chat={data}
          showPrompts={data.messages.length == 0}
          onSend={handleSendMessage}
        />
      </main>
    </div>
  );
}

function ChatDetailHeader({ data, onClear }: ChatDetailViewProps) {
  return (
    <div className={styles.detailHeader}>
      <main className={styles.detailHeaderMain}>
        <ProviderIcon size="large" provider={data.provider} />
        <div className={styles.detailInfo}>
          <h3>{data.subject ? data.subject : 'New Chat'}</h3>
          <div className={styles.provider}>{chatManager.getProviderName(data.provider)}</div>
        </div>
      </main>
      <aside className={styles.detailHeaderRight}>
        <Tooltip title="Clear messages">
          <Button icon={<ClearOutlined />} onClick={onClear} />
        </Tooltip>
        <Tooltip title="Settings">
          <Button icon={<SettingOutlined />} />
        </Tooltip>
      </aside>
    </div>
  );
}
