import cn from 'classnames';

import styles from './index.module.less';

export interface ProviderLogoProps {
  className?: string;
  provider: string;
}

export function ProviderLogo({ className, provider }: ProviderLogoProps) {
  let short = 'N/A';
  if (provider.startsWith('gpt')) {
    short = 'GPT';
  } else if (provider.startsWith('stable-diffusion')) {
    short = 'SD';
  } else if (provider.startsWith('belle')) {
    short = 'BEL';
  }
  return <div className={cn(styles.container, className)}>{short}</div>;
}
