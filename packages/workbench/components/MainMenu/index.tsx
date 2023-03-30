import { MessageOutlined, SoundOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import cn from 'classnames';

import styles from './index.module.less';

export interface MainMenuProps {
  className?: string;
}

export function MainMenu({ className }: MainMenuProps) {
  return (
    <menu className={cn(styles.container, className)}>
      <Tooltip title="ChatSpace" placement="right">
        <li>
          <MessageOutlined className={cn(styles.icon, styles.active)} />
        </li>
      </Tooltip>
      <Tooltip title="TalkSpace" placement="right">
        <li>
          <SoundOutlined className={styles.icon} />
        </li>
      </Tooltip>
    </menu>
  );
}
