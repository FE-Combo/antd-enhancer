import { useStyleRegister } from '@ant-design/cssinjs';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, DropdownProps, Space, Typography, theme } from 'antd';
import { SpaceSize } from 'antd/es/space';
import classNames from 'classnames';
import React, { CSSProperties, Key, ReactNode, Ref, forwardRef } from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

interface Item {
  label: ReactNode;
  key?: Key;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Props {
  className?: string;
  style?: CSSProperties;
  items: Item[];
  count?: number;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  moreRender?: () => ReactNode;
  wrap?: boolean;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode;
  drapdownClassName?: string;
  drapdownStyle?: CSSProperties;
  dropdownPlacement?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'top'
    | 'bottom';
  dropdownRender?: DropdownProps['dropdownRender'];
  dropdownTrigger?: ('click' | 'hover')[];
}

export type RefInternalActions = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

function InternalActions(props: Props, ref: Ref<HTMLDivElement>) {
  const prefixCls = 'antd-enhancer-actions';
  const { theme, token, hashId } = useToken();
  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );
  const {
    className,
    style,
    drapdownClassName,
    drapdownStyle,
    items = [],
    count = 4,
    moreRender,
    size,
    dropdownPlacement = 'bottom',
    direction,
    align,
    split,
    wrap,
    dropdownRender,
    dropdownTrigger,
  } = props;

  const itemRender = (item: Item, index: number) => {
    return (
      <Typography.Link
        disabled={item?.disabled}
        onClick={item?.onClick}
        key={item?.key || index}
      >
        {item.label}
      </Typography.Link>
    );
  };

  return wrapSSR(
    <Space
      ref={ref}
      className={classNames(prefixCls, hashId, className)}
      style={style}
      size={size}
      direction={direction}
      align={align}
      split={split}
      wrap={wrap}
    >
      {items.length > count
        ? items.map((_, index) => {
            if (index < count) {
              return Object.prototype.toString.call(_.label) !==
                '[object Object]'
                ? itemRender(_, index)
                : _.label;
            } else if (index === count) {
              return (
                <Dropdown
                  overlayClassName={classNames(
                    `${prefixCls}-dropdown`,
                    hashId,
                    drapdownClassName,
                  )}
                  overlayStyle={drapdownStyle}
                  key={_?.key || index}
                  menu={{
                    items: items
                      .map((_, itemLength) =>
                        itemLength >= count
                          ? {
                              key: _?.key,
                              label:
                                Object.prototype.toString.call(_.label) !==
                                '[object Object]'
                                  ? itemRender(_, itemLength)
                                  : _.label,
                              disabled: _?.disabled,
                            }
                          : null,
                      )
                      .filter((_) => _) as MenuProps['items'],
                  }}
                  placement={dropdownPlacement}
                  dropdownRender={dropdownRender}
                  trigger={dropdownTrigger}
                >
                  {moreRender?.() || (
                    <Typography.Link
                      className={classNames(`${prefixCls}-more`, hashId)}
                    >
                      <MoreOutlined />
                    </Typography.Link>
                  )}
                </Dropdown>
              );
            } else {
              return <></>;
            }
          })
        : items.map((_, index) => itemRender(_, index))}
    </Space>,
  );
}

const ForwardInternalActions = forwardRef(
  InternalActions,
) as RefInternalActions;

function ExternalActions(props: Props, ref: Ref<HTMLDivElement>) {
  return <ForwardInternalActions {...props} ref={ref} />;
}

const ForwardExternalActions = forwardRef(ExternalActions);

ForwardExternalActions.displayName = 'Actions';

export default ForwardExternalActions;
