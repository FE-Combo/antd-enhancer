import { CSSInterpolation } from '@ant-design/cssinjs';

const genDefaultStyle = (prefixCls: string): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      '&-more': {
        '& > span': {
          transform: 'rotate(90deg)',
        },
      },
    },
  },
];

export default genDefaultStyle;
