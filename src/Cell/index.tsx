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

type BaseColorTypeUnion = keyof typeof BaseColorType;

export interface Props extends HTMLAttributes<HTMLDivElement> {
  display?: 'inline' | 'block' | 'inline-block';
  fontWeight?: 'bold';
  colorType?: keyof typeof ColorType | BaseColorTypeUnion;
  hoverColorType?: keyof typeof HoverColorType | BaseColorTypeUnion;
  activeColorType?: keyof typeof ActiveColorType | BaseColorTypeUnion;
  fillType?: keyof typeof FillType | BaseColorTypeUnion;
  hoverFillType?: keyof typeof HoverFillType | BaseColorTypeUnion;
  borderColorType?: keyof typeof BorderColorType | BaseColorTypeUnion;
  hoverBorderColorType?: keyof typeof HoverBorderColorType | BaseColorTypeUnion;
  activeBorderColorType?:
    | keyof typeof ActiveBorderColorType
    | BaseColorTypeUnion;
  fontSizeType?: keyof typeof FontSizeType;
  lineHeightType?: keyof typeof LineHeightType;
  marginType?: keyof typeof MarginType;
  marginTopType?: keyof typeof MarginType;
  marginRightType?: keyof typeof MarginType;
  marginBottomType?: keyof typeof MarginType;
  marginLeftType?: keyof typeof MarginType;
  paddingType?: keyof typeof PaddingType;
  paddingTopType?: keyof typeof PaddingType;
  paddingRightType?: keyof typeof PaddingType;
  paddingBottomType?: keyof typeof PaddingType;
  paddingLeftType?: keyof typeof PaddingType;
  borderRadiusType?: keyof typeof BorderRadiusType;
  boxShadowType?: keyof typeof BoxShadowType;
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
    fontWeight,
    hoverColorType,
    activeColorType,
    lineHeightType,
    fillType,
    hoverFillType,
    marginType,
    marginTopType,
    marginRightType,
    marginBottomType,
    marginLeftType,
    paddingType,
    paddingTopType,
    paddingRightType,
    paddingBottomType,
    paddingLeftType,
    borderRadiusType,
    boxShadowType,
    borderColorType,
    hoverBorderColorType,
    activeBorderColorType,
    children,
    ...restProps
  } = props;
  const prefixCls = 'antd-enhancer-cell';
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
    marginTopType && `${prefixCls}-marginTop-${marginTopType}`,
    marginRightType && `${prefixCls}-marginRight-${marginRightType}`,
    marginBottomType && `${prefixCls}-marginBottom-${marginBottomType}`,
    marginLeftType && `${prefixCls}-marginLeft-${marginLeftType}`,
    paddingType && `${prefixCls}-padding-${paddingType}`,
    paddingTopType && `${prefixCls}-paddingTop-${paddingTopType}`,
    paddingRightType && `${prefixCls}-paddingRight-${paddingRightType}`,
    paddingBottomType && `${prefixCls}-paddingBottom-${paddingBottomType}`,
    paddingLeftType && `${prefixCls}-paddingLeft-${paddingLeftType}`,
    borderRadiusType && `${prefixCls}-borderRadius-${borderRadiusType}`,
    boxShadowType && `${prefixCls}-boxShadow-${boxShadowType}`,
    borderColorType && `${prefixCls}-borderColor-${borderColorType}`,
    borderColorType && `${prefixCls}-borderWidth-lineWidth`,
    borderColorType && `${prefixCls}-borderStyle-solid`,
    hoverBorderColorType &&
      `${prefixCls}-borderColor-hover-${hoverBorderColorType}`,
    activeBorderColorType &&
      `${prefixCls}-borderColor-active-${activeBorderColorType}`,
    fontWeight && `${prefixCls}-fontWeight-${fontWeight}`,
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
