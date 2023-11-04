---
title: Input
order: 1
nav:
  order: 1
  title: 增强组件
  path: /enhance
---

# Input

Input、Input.Search、Input.TextArea 新增 `trim`，控制输入内容是否去除前后空格

# 代码示例

```jsx
import React, { useState } from 'react';
import { Input } from 'antd-enhancer';

export default () => {
  const [value, setValue] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>();
  return (
    <>
      <Input value={value} onChange={e => setValue(e.target.value)} trim />
      <br/><br/><br/>
      <Input.Search value={value2} onChange={e => setValue2(e.target.value)} trim />
      <br/><br/><br/>
      <Input.TextArea value={value3} onChange={e => setValue3(e.target.value)} trim />
    </>
  )
}
```

# 基本参数

| 参数 | 说明     | 类型      | 默认值 |
| ---- | -------- | --------- | ------ |
| trim | 去除空格 | `boolean` | false  |

[Input 配置参考 antd 文档](https://ant-design.antgroup.com/components/input-cn#api)
