import { Input } from 'antd';
import cn from 'classnames';

import styles from './index.module.less';

export interface MessageBoxProps {
  className?: string;
}

export function MessageBox({ className }: MessageBoxProps) {
  return (
    <div className={cn(styles.container, className)}>
      <Input.TextArea autoSize className={styles.textarea} bordered={false} placeholder="Type your message here" />
    </div>
  );
}
