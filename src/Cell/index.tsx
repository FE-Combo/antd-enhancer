import { useStyleRegister } from '@ant-design/cssinjs';
import { theme } from 'antd';
import classNames from 'classnames';
import React, {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  forwardRef,
} from 'react';
import genDefaultStyle from './jss';
import {
  ActiveBorderColorType,
  ActiveColorType,
  BaseColorType,
  BorderColorType,
  BorderRadiusType,
  BoxShadowType,
  ColorType,
  FillType,
  FontSizeType,
  HoverBorderColorType,
  HoverColorType,
  HoverFillType,
  LineHeightType,
  MarginType,
  PaddingType,
} from './type';

const { useToken } = theme;

export interface Props extends HTMLAttributes<HTMLDivElement> {
  display: 'inline' | 'block' | 'inline-block';
  colorType?: BaseColorType | ColorType;
  hoverColorType?: BaseColorType | HoverColorType;
  activeColorType?: BaseColorType | ActiveColorType;
  fillType?: BaseColorType | FillType;
  hoverFillType?: BaseColorType | HoverFillType;
  borderColorType?: BaseColorType | BorderColorType;
  hoverBorderColorType?: BaseColorType | HoverBorderColorType;
  activeBorderColorType?: BaseColorType | ActiveBorderColorType;
  fontSizeType?: FontSizeType;
  lineHeightType?: LineHeightType;
  marginType?: MarginType;
  paddingType?: PaddingType;
  borderRadiusType?: BorderRadiusType;
  boxShadowType?: BoxShadowType;
}

export type RefInternalCell = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

function InternalCell(
  props: PropsWithChildren<Props>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    className = '',
    display = 'inline-block',
    colorType = 'colorText',
    fontSizeType = 'fontSize',
    hoverColorType,
    activeColorType,
    lineHeightType,
    fillType,
    hoverFillType,
    marginType,
    paddingType,
    borderRadiusType,
    boxShadowType,
    borderColorType,
    hoverBorderColorType,
    activeBorderColorType,
    children,
    ...restProps
  } = props;
  const prefixCls = 'antd-enhancer-theme-text';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );

  const themeProps = [
    `${prefixCls}-display-${display}`,
    colorType && `${prefixCls}-color-${colorType}`,
    hoverColorType && `${prefixCls}-color-hover-${hoverColorType}`,
    activeColorType && `${prefixCls}-color-active-${activeColorType}`,
    fillType && `${prefixCls}-backgroundColor-${fillType}`,
    hoverFillType && `${prefixCls}-backgroundColor-hover-${hoverFillType}`,
    fontSizeType && `${prefixCls}-fontSize-${fontSizeType}`,
    lineHeightType && `${prefixCls}-lineHeight-${lineHeightType}`,
    marginType && `${prefixCls}-margin-${marginType}`,
    paddingType && `${prefixCls}-padding-${paddingType}`,
    borderRadiusType && `${prefixCls}-borderRadius-${borderRadiusType}`,
    boxShadowType && `${prefixCls}-boxShadow-${boxShadowType}`,
    borderColorType && `${prefixCls}-borderColor-${borderColorType}`,
    hoverBorderColorType &&
      `${prefixCls}-borderColor-hover-${hoverBorderColorType}`,
    activeBorderColorType &&
      `${prefixCls}-borderColor-active-${activeBorderColorType}`,
  ].filter((_) => _);

  return wrapSSR(
    <div
      ref={ref}
      className={classNames(prefixCls, ...themeProps, className, hashId)}
      {...restProps}
    >
      {children}
    </div>,
  );
}

const ForwardInternalCell = forwardRef(InternalCell) as RefInternalCell;

function ExternalCell(
  props: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>,
) {
  return <ForwardInternalCell {...props} ref={ref} />;
}

const ForwardExternalCell = forwardRef(ExternalCell);

ForwardExternalCell.displayName = 'Cell';

export default ForwardExternalCell;
