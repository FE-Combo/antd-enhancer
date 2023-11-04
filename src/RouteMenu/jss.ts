import { CSSInterpolation } from '@ant-design/cssinjs';

const genDefaultStyle = (prefixCls: string): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      // 兼容老版本 safari 无法滚动问题
      minHeight: '100%',
      maxHeight: '100%',
      height: '100%',

      '& > .ant-spin-nested-loading': {
        height: '100%',

        '& > .ant-spin-container': {
          height: '100%',
        },
      },
    },
  },
];

export default genDefaultStyle;
