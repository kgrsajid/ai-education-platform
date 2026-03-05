import { ConfigProvider, App, theme } from 'antd';
import type { ReactNode } from 'react';

export const AntdProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#1152d4',
        colorBgContainer: '#1a2233',
        colorBgElevated: '#1a2233',
        colorBgLayout: '#101622',
        colorBgSpotlight: '#1e2a3d',
        colorBorder: '#334155',
        colorBorderSecondary: '#1e293b',
        colorText: '#f1f5f9',
        colorTextSecondary: '#94a3b8',
        colorTextPlaceholder: '#64748b',
        colorLink: '#1152d4',
        colorLinkHover: '#3b7aff',
        borderRadius: 12,
        borderRadiusLG: 16,
        fontFamily: "'Lexend', system-ui, sans-serif",
        fontSize: 14,
        controlHeight: 48,
        controlHeightLG: 52,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      },
      components: {
        Input: {
          activeShadow: '0 0 0 2px rgba(17, 82, 212, 0.2)',
          hoverBorderColor: '#1152d4',
          activeBorderColor: '#1152d4',
          colorBgContainer: 'rgba(30, 41, 59, 0.5)',
          paddingInline: 16,
          paddingBlock: 13,
        },
        Button: {
          fontWeight: 700,
          primaryShadow: '0 4px 12px rgba(17, 82, 212, 0.3)',
          defaultBorderColor: '#334155',
          defaultColor: '#f1f5f9',
          defaultBg: 'rgba(30, 41, 59, 0.5)',
          defaultHoverBg: 'rgba(30, 41, 59, 0.8)',
          defaultHoverBorderColor: '#1152d4',
          defaultHoverColor: '#f1f5f9',
        },
        Form: {
          labelColor: '#cbd5e1',
          labelFontSize: 14,
          itemMarginBottom: 20,
          verticalLabelPadding: '0 0 6px',
        },
        Select: {
          colorBgContainer: 'rgba(30, 41, 59, 0.5)',
          colorBgElevated: '#1a2233',
          optionSelectedBg: '#1152d4',
          optionActiveBg: '#1e2d4a',
          selectorBg: 'rgba(30, 41, 59, 0.5)',
          activeBorderColor: '#1152d4',
          hoverBorderColor: '#1152d4',
        },
        Steps: {
          colorPrimary: '#1152d4',
          colorText: '#f1f5f9',
          colorTextDescription: '#94a3b8',
          colorSplit: '#334155',
          navArrowColor: '#334155',
        },
        Message: {
          colorBgElevated: '#1a2233',
          colorText: '#f1f5f9',
        },
      },
    }}
  >
    <App>
      {children}
    </App>
  </ConfigProvider>
);
