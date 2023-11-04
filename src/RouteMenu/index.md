---
title: RouteMenu
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# RouteMenu

基于 Menu 组件封装，废弃原有的 `"selectedKeys"、"onSelect"、"openKeys"、"onOpenChange"` 属性，使用 `"value"、"onChange"` 代替

原有的 openKeys 由 value `自动计算`得出，value 必须是完成的路径，如："/sub2/sub3/7/8"

当父级菜单中包含当前 value 的路径时，父级菜单会`自动展开`

当 value 路径在 items 中不存在时，菜单会`自动选中最近的父级菜单`

# 代码示例

```jsx
import { useState } from "react";
import { Button } from 'antd';
import { RouteMenu } from 'antd-enhancer';
import { MenuItemType } from 'rc-menu/lib/interface';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItemType[],
  type?: 'group',
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItemType;
}

export default () => {
  const [key, setKey] = useState('/sub2/sub3/7/8/9');
  const items: MenuItemType[] = [
    getItem('Navigation', '/navigation', <MailOutlined />),
    getItem('Navigation One', '/sub1', <MailOutlined />, [
      getItem(
        'Item 1',
        null,
        null,
        [getItem('Option 1', '/sub1/1'), getItem('Option 2', '/sub1/2')],
        'group',
      ),
      getItem(
        'Item 2',
        null,
        null,
        [getItem('Option 3', '/sub1/3'), getItem('Option 4', '/sub1/4')],
        'group',
      ),
    ]),

    getItem('Navigation Two', '/sub2', <AppstoreOutlined />, [
      getItem('Option 5', '/sub2/5'),
      getItem('Option 6', '/sub2/6'),
      getItem('Submenu', '/sub2/sub3', null, [
        getItem('Option 7', '/sub2/sub3/7'),
        getItem('Option 8', '/sub2/sub3/8'),
      ]),
    ]),

    getItem('Navigation Three', '/sub4', <SettingOutlined />, [
      getItem('Option 9', '/sub4/9'),
      getItem('Option 10', '/sub4/10'),
      getItem('Option 11', '/sub4/11'),
      getItem('Option 12', '/sub4/12'),
    ]),
  ];


  return (
    <RouteMenu mode="inline" value={key} accordion onChange={setKey} items={items} />
  )
}
```

# 基本参数

| 参数          | 说明                                              | 类型                                | 默认值 |
| ------------- | ------------------------------------------------- | ----------------------------------- | ------ |
| loading       | 加载状态                                          | `boolean`                           | false  |
| accordion     | 是否开启手风琴模式                                | `boolean`                           | false  |
| value         | 必填，当前选中的菜单项 key，需要传入当前路由      | `number \| string`                  | -      |
| onChange      | 被选中时调用，参数为选中项的 key 值，key 值为路由 | `(value: number \| string) => void` | -      |
| rootClassname | 根节点样式类名                                    | `string`                            | -      |
| rootStyle     | 根节点样式                                        | `React.CSSProperties`               | -      |

[Menu 配置参考 antd 文档](https://ant-design.antgroup.com/components/menu-cn#api)
