import { Avatar as AntdAvatar } from 'antd';
import cn from 'classnames';

import styles from './index.module.less';

export interface AvatarProps {
  className?: string;
}

export function Avatar({ className }: AvatarProps) {
  return (
    <AntdAvatar
      className={cn(styles.container, className)}
      size="large"
      src="https://s3-imfile.feishucdn.com/static-resource/v1/v2_5e8b8e75-f7d3-484a-876c-79067cd2189g~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp"
    />
  );
}
