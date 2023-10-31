---
title: Actions
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# Actions

操作按钮集，常用于 Table 操作列

# 代码示例

```jsx
import { Divider, Popconfirm } from 'antd';
import { Actions } from 'antd-enhancer';

export default () => {
  const items = [
    {
      label: '删除',
      disabled: true,
      onClick: () => console.info('删除'),
    },
    {
      label: '编辑',
      onClick: () => console.info('编辑'),
    },
    {
      label: '查看',
      onClick: () => console.info('查看'),
    },
    {
      label: '禁用',
      onClick: () => console.info('禁用'),
    },
  ];

  return (
    <div>
      <Actions items={items} count={3} />
    </div>
  );
};
```

# 基本参数

| 参数              | 说明             | 类型                                                                                      | 默认值       |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------- | ------------ |
| className         | 类名             | string                                                                                    | -            |
| style             | 样式             | CSSProperties                                                                             | -            |
| items             | 操作按钮集合     | { label: ReactNode; key?: Key, onClick?: () => void, disabled?: boolean }[]               | -            |
| count             | 操作按钮显示数量 | number                                                                                    | 4            |
| moreContent       | 更多按钮内容     | ReactNode                                                                                 |              |
| wrap              | 是否换行         | boolean                                                                                   | false        |
| direction         | 操作按钮方向     | 'horizontal' \| 'vertical'                                                                | 'horizontal' |
| align             | 操作按钮对齐方式 | 'left' \| 'right' \| 'center' \| 'start' \| 'end'                                         | 'start'      |
| split             | 分割线内容       | ReactNode                                                                                 |              |
| drapdownClassName | 下拉菜单类名     | string                                                                                    |              |
| drapdownStyle     | 下拉菜单样式     | CSSProperties                                                                             |              |
| dropdownPlacement | 下拉菜单弹出位置 | 'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight' | 'bottom'     |
| dropdownRender    | 下拉菜单渲染     | (originNode: ReactNode) => ReactNode                                                      | -            |
| dropdownTrigger   | 下拉菜单触发方式 | ('click' \| 'hover')[]                                                                    | ['hover']    |
