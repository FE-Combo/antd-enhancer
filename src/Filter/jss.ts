import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

const genDefaultStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      background: token.colorBgBase,

      '& .ant-form': {
        alignItems: 'flex-end',
        justifyContent: 'space-between',

        '& .ant-form-item': {
          width: '25%',
          paddingRight: token.padding,
          margin: '0',
          display: 'flex',
          flexDirection: 'column',

          '& .ant-row': {
            width: '100%',
            margin: '0',
            display: 'flex',
            flexDirection: 'column',

            '& .ant-form-item-label': {
              textAlign: 'left',
            }
          },

          '&:nth-child(4n)': {
            paddingRight: '0',
          },
        },
        [`& .${prefixCls}-empty-item`]: {
          width: '25%',
          marginBottom: '0',
        },

        [`& .${prefixCls}-button-wrapper`]: {
          width: '25%',

          [`& .${prefixCls}-button-wrapper-sider`]: {
            color: token.colorText,

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
