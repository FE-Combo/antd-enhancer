import { useStyleRegister } from '@ant-design/cssinjs';
import { Pagination, PaginationProps, Spin, theme } from 'antd';
import classNames from 'classnames';
import React, {
  CSSProperties,
  PropsWithChildren,
  Ref,
  forwardRef,
  memo,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props {
  count?: number;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  pagination?: PaginationProps | boolean;
  empty?: React.ReactNode;
}

export type RefInternalGridList = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

function InternalGridList(
  props: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>,
) {
  const {
    className,
    loading = false,
    style,
    count = 4,
    children,
    pagination,
    empty,
  } = props;
  const prefixCls = 'antd-enhancer-grid-list';
  const { theme, token, hashId } = useToken();
  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );

  const childrenLength = React.Children.count(children);

  return wrapSSR(
    <Spin spinning={loading}>
      {childrenLength ? (
        <div
          ref={ref}
          className={classNames(prefixCls, hashId, className)}
          style={{
            gridTemplateColumns: `repeat(${count},  calc((100% - ${
              (count - 1) * token.marginSM
            }px) / ${count}))`,
            ...style,
          }}
        >
          {children}
        </div>
      ) : (
        empty
      )}
      {pagination && (
        <div
          className={classNames(prefixCls + '-pagination', hashId, className)}
        >
          <Pagination
            {...(typeof pagination === 'boolean' ? {} : pagination)}
          />
        </div>
      )}
    </Spin>,
  );
}

const ForwardInternalGridList = forwardRef(
  InternalGridList,
) as RefInternalGridList;

function ExternalGridList(
  props: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>,
) {
  return <ForwardInternalGridList {...props} ref={ref} />;
}

const ForwardExternalGridList = forwardRef(ExternalGridList);

ForwardExternalGridList.displayName = 'GridList';

export default memo(ForwardExternalGridList);
