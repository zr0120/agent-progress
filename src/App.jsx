import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AppRouter from '@/router';
import { appTheme } from './theme.js';

export default function App() {
  return (
    <ConfigProvider locale={zhCN} componentSize="middle" theme={appTheme}>
      <AppRouter />
    </ConfigProvider>
  );
}
