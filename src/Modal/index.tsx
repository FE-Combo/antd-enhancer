import React, { FC } from 'react';
import { Modal, ModalProps, Spin, theme } from 'antd';
import genDefaultStyle from './jss';
import classNames from 'classnames';
import { useStyleRegister } from '@ant-design/cssinjs';

const { useToken } = theme;

interface Props extends ModalProps {
  loading?: boolean;
  fixHeight?: boolean;
}

const Index: FC<Props> = props => {
  const prefixCls = 'antd-enhancer-modal';
  const { theme, token, hashId } = useToken();
  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );
  const {
    loading = false,
    children,
    className = '',
    fixHeight = false,
    ...restProps
  } = props;

  return wrapSSR(
    <Modal
      className={classNames(prefixCls, className, hashId, fixHeight? prefixCls+'-fix-height': '')}
      {...restProps}
    >
      <Spin spinning={loading}>{children}</Spin>
    </Modal>,
  );
};

export default Index;
