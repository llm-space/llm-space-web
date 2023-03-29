import cn from 'classnames';

import styles from './index.module.less';

export interface ProviderIconProps {
  className?: string;
  provider: string;
  size?: 'small' | 'medium' | 'large';
}

export function ProviderIcon({ className, provider, size }: ProviderIconProps) {
  let short = 'N/A';
  if (provider.startsWith('gpt')) {
    short = 'GPT';
  } else if (provider.startsWith('stable-diffusion')) {
    short = 'SD';
  } else if (provider.startsWith('belle')) {
    short = 'BEL';
  }
  return <div className={cn(styles.container, className, size && { [styles[size]]: true })}>{short}</div>;
}
