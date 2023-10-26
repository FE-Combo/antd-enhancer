import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';
import { AliasToken } from 'antd/lib/theme/interface/alias';
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

type KeyOfAliasToken = keyof AliasToken;

function genericStyles(
  prefixCls: string,
  cssProperties: string,
  keys: KeyOfAliasToken[],
  token: GlobalToken,
) {
  return keys.reduce(
    (_, key) => ({
      ..._,
      [`.${prefixCls}-${cssProperties}-${key}`]: {
        [cssProperties]: token[key as KeyOfAliasToken],
      },
    }),
    {},
  );
}

function genericStylesByHover(
  prefixCls: string,
  cssProperties: string,
  keys: KeyOfAliasToken[],
  token: GlobalToken,
) {
  return keys.reduce(
    (_, key) => ({
      ..._,
      [`.${prefixCls}-${cssProperties}-hover-${key}`]: {
        '&:hover': {
          [cssProperties]: token[key as KeyOfAliasToken],
        },
      },
    }),
    {},
  );
}

function genericStylesByActive(
  prefixCls: string,
  cssProperties: string,
  keys: KeyOfAliasToken[],
  token: GlobalToken,
) {
  return keys.reduce(
    (_, key) => ({
      ..._,
      [`.${prefixCls}-${cssProperties}-active-${key}`]: {
        '&:active': {
          [cssProperties]: token[key as KeyOfAliasToken],
        },
      },
    }),
    {},
  );
}

// https://ant-design.antgroup.com/docs/blog/css-in-js-cn
const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  const colors = genericStyles(
    prefixCls,
    'color',
    Object.keys(BaseColorType).concat(
      Object.keys(ColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  const hoverColors = genericStylesByHover(
    prefixCls,
    'color',
    Object.keys(BaseColorType).concat(
      Object.keys(HoverColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  const activeColors = genericStylesByActive(
    prefixCls,
    'color',
    Object.keys(BaseColorType).concat(
      Object.keys(ActiveColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  const fills = genericStyles(
    prefixCls,
    'backgroundColor',
    Object.keys(BaseColorType).concat(
      Object.keys(FillType),
    ) as KeyOfAliasToken[],
    token,
  );

  const hoverFills = genericStylesByHover(
    prefixCls,
    'backgroundColor',
    Object.keys(BaseColorType).concat(
      Object.keys(HoverFillType),
    ) as KeyOfAliasToken[],
    token,
  );

  const fontSizes = genericStyles(
    prefixCls,
    'fontSize',
    Object.keys(FontSizeType) as KeyOfAliasToken[],
    token,
  );

  const lineHeights = genericStyles(
    prefixCls,
    'lineHeight',
    Object.keys(LineHeightType) as KeyOfAliasToken[],
    token,
  );

  const margins = genericStyles(
    prefixCls,
    'margin',
    Object.keys(MarginType) as KeyOfAliasToken[],
    token,
  );

  const paddings = genericStyles(
    prefixCls,
    'padding',
    Object.keys(PaddingType) as KeyOfAliasToken[],
    token,
  );

  const borderRadiuses = genericStyles(
    prefixCls,
    'borderRadius',
    Object.keys(BorderRadiusType) as KeyOfAliasToken[],
    token,
  );

  const boxShadows = genericStyles(
    prefixCls,
    'boxShadow',
    Object.keys(BoxShadowType) as KeyOfAliasToken[],
    token,
  );

  const borderColors = genericStyles(
    prefixCls,
    'borderColor',
    Object.keys(BaseColorType).concat(
      Object.keys(BorderColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  const hoverBorderColors = genericStylesByHover(
    prefixCls,
    'borderColor',
    Object.keys(BaseColorType).concat(
      Object.keys(HoverBorderColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  const activeBorderColors = genericStylesByActive(
    prefixCls,
    'borderColor',
    Object.keys(BaseColorType).concat(
      Object.keys(ActiveBorderColorType),
    ) as KeyOfAliasToken[],
    token,
  );

  return [
    {
      [`.${prefixCls}`]: {
        //
      },
    },
    {
      [`.${prefixCls}-display-inline`]: {
        display: 'inline',
      },
    },
    {
      [`.${prefixCls}-display-inline-block`]: {
        display: 'inline-block',
      },
    },
    {
      [`.${prefixCls}-display-block`]: {
        display: 'block',
      },
    },
    colors,
    hoverColors,
    activeColors,
    fills,
    hoverFills,
    fontSizes,
    lineHeights,
    margins,
    paddings,
    borderRadiuses,
    boxShadows,
    borderColors,
    hoverBorderColors,
    activeBorderColors,
  ];
};

export default genDefaultStyle;
