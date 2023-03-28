import { ConfigProvider } from 'antd';
import us_EN from 'antd/locale/en_US';

import { Workbench } from '@/workbench';

import styles from './index.module.less';

export function App() {
  return (
    <ConfigProvider locale={us_EN}>
      <div className={styles.container}>
        <Workbench />
      </div>
    </ConfigProvider>
  );
}
