---
title: Mask
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# Mask

遮罩组件

# 代码示例

```jsx
import { Mask } from 'antd-enhancer';

export default () => {
  return (
    <div>
      <Mask trigger={['click']} render={() => 111}>
        Text
      </Mask>
    </div>
  );
};
```

# 基本参数

| 参数      | 说明     | 类型                        | 默认值      |
| --------- | -------- | --------------------------- | ----------- |
| className | 类名     | string                      | -           |
| style     | 样式     | CSSProperties               | -           |
| trigger   | 触发方式 | `('click' \| 'hover')[]` 等 | `['click']` |
| render    | 渲染内容 | `() => ReactNode`           | -           |
