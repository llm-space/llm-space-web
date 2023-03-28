import cn from 'classnames';

import styles from './index.module.less';

export interface MainMenuProps {
  className?: string;
}

export function MainMenu({ className }: MainMenuProps) {
  return <div className={cn(styles.container, className)}></div>;
}
