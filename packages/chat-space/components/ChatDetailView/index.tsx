import cn from 'classnames';

import styles from './index.module.less';

export interface ChatDetailViewProps {
  className?: string;
}

export function ChatDetailView({ className }: ChatDetailViewProps) {
  return <div className={cn(styles.container, className)}>ChatDetailView</div>;
}
