import { CSSInterpolation } from '@ant-design/cssinjs';

const genDefaultStyle = (prefixCls: string): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      position: 'relative',
    },
  },
];

export default genDefaultStyle;
