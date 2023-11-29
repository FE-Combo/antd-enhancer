import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';

const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'grid',
      gridGap: `${token.margin}px ${token.marginSM}px`,
    },
    [`.${prefixCls}-pagination`]: {
      marginTop: token.margin,
      textAlign: 'right',
    },
  },
];

export default genDefaultStyle;
