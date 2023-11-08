import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';
const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`& .${prefixCls}-icon`]: {
        '& .anticon': {
          fontSize: token.fontSizeXL,
        },
      },
    },
  },
];

export default genDefaultStyle;
