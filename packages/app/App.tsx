import { ConfigProvider } from 'antd';
import us_EN from 'antd/locale/en_US';

import 'antd/dist/reset.css';

export function App() {
  return (
    <ConfigProvider locale={us_EN}>
      <div>
        <h1>llm-space</h1>
        <p>TODO: Add a real app here.</p>
      </div>
    </ConfigProvider>
  );
}
