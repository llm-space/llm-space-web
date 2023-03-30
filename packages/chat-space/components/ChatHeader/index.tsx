import { ClearOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import type { Chat } from '@/core';
import { chatManager } from '@/core';

import { ProviderIcon } from '../ProviderIcon';

import styles from './index.module.less';

export interface ChatDetailHeaderProps {
  className?: string;
  data: Chat;
  onClear?: () => void;
}

export function ChatDetailHeader({ data, onClear }: ChatDetailHeaderProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ProviderIcon size="large" provider={data.provider} />
        <div className={styles.info}>
          <h3>{data.subject ? data.subject : 'New Chat'}</h3>
          <div className={styles.provider}>{chatManager.getProviderName(data.provider)}</div>
        </div>
      </main>
      <aside className={styles.right}>
        <Tooltip title="Clear messages">
          <Button icon={<ClearOutlined />} onClick={onClear} />
        </Tooltip>
        <Tooltip title="Settings">
          <Button icon={<ToolOutlined />} />
        </Tooltip>
      </aside>
    </div>
  );
}
