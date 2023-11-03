import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';

const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      padding: `${token.padding}px ${token.paddingLG}px`,
      [`& .${prefixCls}-breadcrumb`]: {
        marginBottom: token.marginXS,
      },

      [`& .${prefixCls}-header`]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [`& .${prefixCls}-header-title`]: {
          margin: 0,
        },

        [`& .${prefixCls}-header-back-icon`]: {
          margin: 0,
          cursor: 'pointer',
        },
      },
      [`& .${prefixCls}-content`]: {
        marginTop: token.marginSM,
      },
    },
  },
];

export default genDefaultStyle;
