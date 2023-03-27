import { CodepenOutlined } from '@ant-design/icons';
import cn from 'classnames';

import styles from './index.module.less';

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn(styles.container, className)}>
      <CodepenOutlined />
    </div>
  );
}
