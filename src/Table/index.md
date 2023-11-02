---
title: Table
order: 1
nav:
  order: 1
  title: 增强组件
  path: /enhance
---

# Table

- 优化
  - 设置 `rowKey` 默认值为 index
  - 刷新表单时，当前页为空数据自动回退上一页
  - columns dataIndex 默认与 index 一致
- 新特性
  - 新增默认数据填充 `defaultData`

# 代码示例

```jsx
import { Table } from 'antd-enhancer';

export default () => {
  const columns = [
    {
      title: '账号',
      key: 'username',
      fixed: 'left' as const,
    },
    {
      title: '姓名',
      key: 'nickname',
    },
    {
      title: '角色',
      key: 'roleMetas',
    },
    {
      title: '创建人',
      key: 'creator',
    },
    {
      title: '创建时间',
      key: 'gmtCreate',
    },
    {
      width: 140,
      title: '操作',
      key: 'operation',
      fixed: 'right' as const,
      render: () => {
        return <div>actions</div>;
      },
    },
  ];
  const dataSource = [
    {
      username: '158888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
    {
      username: '15888888888',
      nickname: '小王',
      roleMetas: '超管',
      creator: '大王',
      gmtCreate: '2022/6/23',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
          type: "checkbox",
           onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: DataType) => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
        }}
    />
  );
}
```

# 基本参数

| 参数        | 说明         | 类型     | 默认值 |
| ----------- | ------------ | -------- | ------ |
| defaultData | 默认数据填充 | `string` | `""`   |

[Table 配置参考 antd 文档](https://ant-design.antgroup.com/components/table-cn#api)
