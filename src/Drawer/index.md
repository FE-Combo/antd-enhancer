---
title: Drawer
order: 1
nav:
  order: 1
  title: 增强组件
  path: /enhance
---

# Drawer
- 新特性
    - 新增`Drawer`的`loading`状态，控制`Drawer`的内容的`loading`状态

## 代码示例
```jsx
import { useState } from "react";
import { Input, Select, Button } from "antd";
import { Drawer } from 'antd-enhancer';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Button onClick={()=>setOpen(true)}>打开</Button>
        <Drawer title="Drawer Title" open={open} onCancel={()=>setOpen(false)}>
            <Input name="test" placeholder="请输入" />
            <Input name="test2" placeholder="请输入"/>
            <Select name="test3" placeholder="请选择"/>
            <Input name="test4" placeholder="请输入" />
            <Input name="test5" placeholder="请输入"/>
            <Select name="test6" placeholder="请选择"/>
            <Input name="test7" placeholder="请输入" />
            <Input name="test8" placeholder="请输入"/>
            <Select name="test9" placeholder="请选择"/>
            <Input name="test" placeholder="请输入" />
            <Input name="test2" placeholder="请输入"/>
            <Select name="test3" placeholder="请选择"/>
            <Input name="test4" placeholder="请输入" />
            <Input name="test5" placeholder="请输入"/>
            <Select name="test6" placeholder="请选择"/>
            <Input name="test7" placeholder="请输入" />
            <Input name="test8" placeholder="请输入"/>
            <Select name="test9" placeholder="请选择"/>
            <Input name="test" placeholder="请输入" />
            <Input name="test2" placeholder="请输入"/>
            <Select name="test3" placeholder="请选择"/>
            <Input name="test4" placeholder="请输入" />
            <Input name="test5" placeholder="请输入"/>
            <Select name="test6" placeholder="请选择"/>
            <Input name="test7" placeholder="请输入" />
            <Input name="test8" placeholder="请输入"/>
            <Select name="test9" placeholder="请选择"/>
        </Drawer>
    </>
  )
}
```

### 基本参数

| 参数  | 说明 | 类型     | 默认值 |
| ----- | ---- | -------- | ------ |
| loading | 加载状态 | `boolean` | false |

[Drawer配置参考antd文档](https://ant-design.antgroup.com/components/drawer-cn#api)