import { Button } from 'antd';
import cn from 'classnames';

import styles from './index.module.less';

export interface WorkspaceProps {
  className?: string;
}

export function Workspace({ className }: WorkspaceProps) {
  return (
    <div className={cn(styles.container, className)}>
      <aside className={styles.sideBar}></aside>
      <main className={styles.main}>
        <header className={styles.header}></header>
        <main className={styles.content}></main>
      </main>
    </div>
  );
}
