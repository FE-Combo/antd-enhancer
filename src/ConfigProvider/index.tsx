import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import React, { FC, createContext, memo } from 'react';
import en from './locales/en';

export interface ConfigConsumerProps {
  locale?: typeof en;
  token?: Record<string, any>;
}

export const EnhancedConfigContext = createContext<ConfigConsumerProps>({});

export const useToken = () => {
  const { token = {} } = React.useContext(EnhancedConfigContext);
  return token;
};

export interface Props extends ConfigProviderProps {
  localeEnhanced?: typeof en;
  tokenEnhanced?: Record<string, string>;
}

const Index: FC<Props> = (props) => {
  const {
    localeEnhanced = en,
    tokenEnhanced = {},
    children,
    ...restProps
  } = props;

  return (
    <ConfigProvider {...restProps}>
      <EnhancedConfigContext.Provider
        value={{ locale: localeEnhanced, token: tokenEnhanced }}
      >
        {children}
      </EnhancedConfigContext.Provider>
    </ConfigProvider>
  );
};

export default memo(Index);
