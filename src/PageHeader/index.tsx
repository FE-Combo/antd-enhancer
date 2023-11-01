import { useStyleRegister } from '@ant-design/cssinjs';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Space, Typography, theme } from 'antd';
import classNames from 'classnames';
import React, {
  CSSProperties,
  ForwardedRef,
  MouseEvent,
  PropsWithChildren,
  Ref,
  forwardRef,
  memo,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props {
  className?: string;
  style?: CSSProperties;
  title: string;
  subTitle?: React.ReactNode;
  onBack?: (event?: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  backIcon?: React.ReactNode;
  extra?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export type RefInternalPageHeader = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

function InternalPageHeader(
  props: PropsWithChildren<Props>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    className,
    style,
    title,
    extra,
    onBack,
    backIcon = <ArrowLeftOutlined />,
    children,
    subTitle,
    breadcrumb,
  } = props;
  const { theme, token, hashId } = useToken();
  const prefixCls = 'antd-enhancer-page-header';

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );

  return wrapSSR(
    <div
      className={classNames(prefixCls, className, hashId)}
      style={style}
      ref={ref}
    >
      {breadcrumb && (
        <div
          className={classNames(prefixCls + '-breadcrumb', className, hashId)}
        >
          {breadcrumb}
        </div>
      )}
      <div className={classNames(prefixCls + '-header', className, hashId)}>
        <Space align="end" size={token.marginSM}>
          <Space size={token.margin}>
            {backIcon && (
              <Typography.Title
                onClick={onBack}
                className={classNames(
                  prefixCls + '-header-back-icon',
                  className,
                  hashId,
                )}
                level={5}
              >
                {backIcon}
              </Typography.Title>
            )}
            <Typography.Title
              className={classNames(
                prefixCls + '-header-title',
                className,
                hashId,
              )}
              level={2}
            >
              {title}
            </Typography.Title>
          </Space>
          {subTitle && (
            <Typography.Text style={{ color: token.colorTextSecondary }}>
              {subTitle}
            </Typography.Text>
          )}
        </Space>
        {extra}
      </div>
      {children && (
        <div className={classNames(prefixCls + '-content', className, hashId)}>
          {children}
        </div>
      )}
    </div>,
  );
}

const ForwardInternalPageHeader = forwardRef(
  InternalPageHeader,
) as RefInternalPageHeader;

function ExternalPageHeader(props: Props, ref: Ref<HTMLDivElement>) {
  return <ForwardInternalPageHeader {...props} ref={ref} />;
}

const ForwardExternalPageHeader = forwardRef(ExternalPageHeader);

ForwardExternalPageHeader.displayName = 'PageHeader';

export default memo(ForwardExternalPageHeader);
