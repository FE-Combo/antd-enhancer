import { CSSInterpolation } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';

const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      background: token.colorBgBase,
      alignItems: 'flex-end',

      '& .ant-form-item': {
        margin: `0 0 ${token.margin}px 0`,
        display: 'flex',
        flexDirection: 'column',

        '& .ant-row': {
          width: '100%',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',

          '& .ant-form-item-label': {
            textAlign: 'left',

            '& label': {
              height: 'auto',
              marginBottom: token.marginXXS,
            },
          },
        },
      },
      [`& .${prefixCls}-empty-item`]: {
        marginBottom: '0',
      },

      [`& .${prefixCls}-button-wrapper`]: {
        marginBottom: `${token.margin}px`,

        [`& .${prefixCls}-button-wrapper-sider`]: {
          '& .ant-space-item': {
            textWrap: 'nowrap',
          },

          [`& .${prefixCls}-button-wrapper-sider-text`]: {
            '&:hover': {
              color: token.colorPrimary,
            },
          },
        },
      },
    },
  },
];

export default genDefaultStyle;
