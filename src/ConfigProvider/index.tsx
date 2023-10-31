import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import React, { FC, createContext, memo } from 'react';
import en from './locales/en';

export interface ConfigConsumerProps {
  locale?: typeof en;
}

export const EnhancedConfigContext = createContext<ConfigConsumerProps>({});

export interface Props extends ConfigProviderProps {
  localeEnhanced?: typeof en;
}

const Index: FC<Props> = (props) => {
  const { localeEnhanced = en, children, ...restProps } = props;

  return (
    <ConfigProvider {...restProps}>
      <EnhancedConfigContext.Provider value={{ locale: localeEnhanced }}>
        {children}
      </EnhancedConfigContext.Provider>
    </ConfigProvider>
  );
};

export default memo(Index);
