---
title: Modal
order: 1
nav:
  order: 1
  title: 增强组件
  path: /enhance
---


# Modal

- 新特性
    - 新增`Modal`的`loading`状态，控制`Modal`的内容的`loading`状态
    - 新增`Modal`的`fixHeight`参数，控制`Modal`的内容是否固定高度

# 代码示例
```jsx
import { useState } from "react";
import { Input, Select, Button } from "antd";
import { Modal } from 'antd-enhancer';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Button onClick={()=>setOpen(true)}>打开</Button>
        <Modal title="Modal Title" open={open} onCancel={()=>setOpen(false)}>
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
        </Modal>
    </>
  )
}
```

# 基本参数

| 参数  | 说明 | 类型     | 默认值 |
| ----- | ---- | -------- | ------ |
| loading | 加载状态 | `boolean` | false    |
| fixHeight | 内容是否固定高度 | `boolean` | false    |

[Modal 配置参考antd文档](https://ant-design.antgroup.com/components/modal-cn#api)