import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';
const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      '&-highlight': {
        color: token.colorPrimary,
      },

      '& .ant-select-selector': {
        '& .ant-select-selection-item': {
          [`& .${prefixCls}-tooltip`]: {
            display: 'inline-block !important',
            lineHeight: 'unset',
          },
        },
      },
    },
  },
];

export default genDefaultStyle;
