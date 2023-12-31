import { useStyleRegister } from '@ant-design/cssinjs';
import { Table, Typography, theme } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { TableProps } from 'antd/lib/table';
import {
  ColumnGroupType,
  ColumnType,
  ColumnsType,
  GetRowKey,
} from 'antd/lib/table/interface';
import classNames from 'classnames';
import { Reference } from 'rc-table';
import React, {
  ForwardedRef,
  Ref,
  forwardRef,
  useEffect,
  useMemo,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface NextColumnType<T = unknown>
  extends Omit<
    ColumnGroupType<T> | ColumnType<T>,
    'key' | 'dataIndex' | 'rowKey'
  > {
  key?: keyof T;
  dataIndex?: keyof T;
}

export interface Props<T extends AnyObject = AnyObject>
  extends Omit<TableProps<T>, 'columns' | 'rowKey'> {
  defaultData?: string;
  columns?: NextColumnType<T>[];
  rowKey?: keyof T | ((record: T, index?: number) => keyof T);
}

export type RefInternalTable = <RecordType extends AnyObject = AnyObject>(
  props: React.PropsWithChildren<Props<RecordType>> & {
    ref?: React.Ref<Reference>;
  },
) => React.ReactElement;

const InternalTable = <T extends AnyObject = AnyObject>(
  props: Props<T>,
  ref: ForwardedRef<Reference>,
) => {
  const prefixCls = 'antd-enhancer-table';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );
  const {
    columns = [],
    rowKey,
    pagination,
    defaultData,
    className,
    children,
    ...restProps
  } = props;

  // 缺省dataIndex、render
  const nextColumns = useMemo(
    () =>
      columns.map((_) => {
        const item = { dataIndex: _?.key, ..._ } as ColumnsType<T>[number];
        if (item.render) {
          const render = item.render;
          item.render = (value, record, index) =>
            render(value, record, index) || defaultData;
        } else {
          item.render = (value) => {
            if (value !== null && value !== undefined) {
              if (typeof value === 'bigint') {
                return value.toString();
              } else {
                const nextValue =
                  typeof value === 'string' ? value : JSON.stringify(value);
                return (
                  <Typography.Text ellipsis={{ tooltip: nextValue }}>
                    {nextValue}
                  </Typography.Text>
                );
              }
            } else {
              return defaultData;
            }
          };
        }
        return item;
      }),
    [columns],
  );

  // 刷新表单时，当前页为空数据自动返回最后一页或者直接回到第一页
  useEffect(
    () => {
      if (typeof pagination === 'object') {
        const current = pagination?.current || 0;
        const pageSize = pagination?.pageSize || 0;
        const total = pagination?.total || 0;
        if (current > 1 && pageSize > 0) {
          if (total <= 0) {
            // 直接回到第一页
            pagination?.onChange?.(1, pageSize);
          } else if (current > Math.ceil(total / pageSize)) {
            // 返回当前条件的最后一页
            pagination?.onChange?.(Math.ceil(total / pageSize), pageSize);
          }
        }
      }
    },
    pagination
      ? [pagination?.current, pagination?.pageSize, pagination?.total]
      : [],
  );

  return wrapSSR(
    <Table
      ref={ref}
      className={classNames(prefixCls, hashId, className)}
      rowKey={
        (rowKey || ((_, i) => i!.toString())) as string | keyof T | GetRowKey<T>
      }
      columns={nextColumns}
      pagination={pagination}
      {...restProps}
    >
      {children}
    </Table>,
  );
};

const ForwardInternalTable = forwardRef(InternalTable) as RefInternalTable;

function ExternalTable<T extends AnyObject = AnyObject>(
  props: Props<T>,
  ref: Ref<Reference>,
) {
  return <ForwardInternalTable<T> {...props} ref={ref} />;
}

const ForwardExternalTable = forwardRef(ExternalTable);

ForwardExternalTable.displayName = 'Table';

export default ForwardExternalTable;
