import { CSSInterpolation } from '@ant-design/cssinjs';
const genDefaultStyle = (prefixCls: string): CSSInterpolation => [
  {
    [`.${prefixCls}`]: { }
  },
];

export default genDefaultStyle;
