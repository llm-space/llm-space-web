import cn from 'classnames';

import styles from './index.module.less';

export interface ProviderLogoProps {
  className?: string;
  provider: string;
}

export function ProviderLogo({ className }: ProviderLogoProps) {
  return <div className={cn(styles.container, className)}>GPT</div>;
}
