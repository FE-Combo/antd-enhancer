---
title: GridList
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# GridList

网格列表容器

# 代码示例

```jsx
import { Input, Select } from 'antd';
import { GridList } from 'antd-enhancer';

export default () => {
  return (
    <GridList count={3} pagination empty="empty">
      <Input name="test" placeholder="请输入" />
      <Input name="test2" placeholder="请输入" />
      <Select name="test3" placeholder="请选择" />
      <Select name="test4" placeholder="请选择" />
      <Select name="test5" placeholder="请选择" />
    </GridList>
  );
};
```

# 基本参数

| 参数       | 说明         | 类型                                                                                         | 默认值 |
| ---------- | ------------ | -------------------------------------------------------------------------------------------- | ------ |
| className  | 容器类名     | `string`                                                                                     | -      |
| style      | 容器样式     | `CSSProperties`                                                                              | -      |
| count      | 每行显示数量 | `number`                                                                                     | -      |
| pagination | 是否分页     | `boolean` \| [PaginationProps](https://ant-design.antgroup.com/components/pagination-cn#api) | false  |
| loading    | 是否加载中   | `boolean`                                                                                    | false  |
| empty      | 空状态       | `ReactNode`                                                                                  | -      |
