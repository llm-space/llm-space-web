import { ConfigProvider } from 'antd';
import us_EN from 'antd/locale/en_US';

import { Workspace } from '@/workspace';

import styles from './index.module.less';

export function App() {
  return (
    <ConfigProvider
      locale={us_EN}
      theme={{
        token: {
          colorPrimary: '#3888ff',
        },
      }}
    >
      <div className={styles.container}>
        <Workspace />
      </div>
    </ConfigProvider>
  );
}
