import { useStyleRegister } from '@ant-design/cssinjs';
import { Modal, ModalProps, Spin, theme } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props extends Omit<ModalProps, 'onClose'> {
  loading?: boolean;
  fixHeight?: boolean;
  onClose: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const Index: FC<Props> = (props) => {
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
      className={classNames(
        prefixCls,
        className,
        hashId,
        fixHeight ? prefixCls + '-fix-height' : '',
      )}
      {...restProps}
    >
      <Spin spinning={loading}>{children}</Spin>
    </Modal>,
  );
};

export default Index;
