import React, { FC, createContext } from 'react';
import { ConfigProvider } from 'antd';
import en from "./locales/en";
import { ConfigProviderProps } from 'antd/lib/config-provider';

export interface ConfigConsumerProps  {
  locale?: typeof en;
}

export const EnhancedConfigContext = createContext<ConfigConsumerProps>({});

interface Props extends ConfigProviderProps {
  localeEnhanced?: typeof en;
}

const Index: FC<Props> = props => {
  const { localeEnhanced = en, children, ...restProps } = props;

  return (
    <ConfigProvider {...restProps}>
      <EnhancedConfigContext.Provider value={{locale: localeEnhanced}}>
        {children}
      </EnhancedConfigContext.Provider>
    </ConfigProvider>
  );
};

export default Index;
