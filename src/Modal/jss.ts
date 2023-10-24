import { CSSInterpolation } from '@ant-design/cssinjs';
const genDefaultStyle = (prefixCls: string): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      '& .ant-modal-body': {
        "& .ant-spin-nested-loading": {
          height: '100%',
          maxHeight: "inherit",
        }
      },
    },
    [`.${prefixCls}-fix-height`]: {
      '& .ant-modal-content': {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 200px)',

        "& .ant-modal-header": {
          flex: '0 0 auto',
        },

        "& .ant-modal-body": {
          flex: "1 1 auto",
          overflow: "auto",
        },

        "& .ant-modal-footer": {
          flex: "0 0 auto",
        }
      },
    }
  },
];

export default genDefaultStyle;
