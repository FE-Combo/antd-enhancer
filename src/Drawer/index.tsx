import { useStyleRegister } from '@ant-design/cssinjs';
import { Drawer, DrawerProps, Spin, theme } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props extends Omit<DrawerProps, 'onClose'> {
  loading?: boolean;
  onOk?: () => void;
  confirmLoading?: boolean;
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const Index: FC<Props> = (props) => {
  const prefixCls = 'antd-enhanced-drawer';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );

  const { rootClassName = '', loading = false, children, ...restProps } = props;

  return wrapSSR(
    <Drawer
      rootClassName={classNames(prefixCls, rootClassName, hashId)}
      {...restProps}
    >
      <Spin spinning={loading}>{children}</Spin>
    </Drawer>,
  );
};

export default Index;
