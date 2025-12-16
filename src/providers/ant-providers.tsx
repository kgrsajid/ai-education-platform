import { ConfigProvider, theme } from 'antd';
import type { ReactNode } from 'react';


export const AntdProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#2563eb',
        colorPrimaryHover: '#3b82f6',
        colorBgLayout: '#eff6ff',
      },
    }}
  >
    {children}
  </ConfigProvider>
);