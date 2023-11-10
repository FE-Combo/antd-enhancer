---
title: Select
order: 1
nav:
  order: 1
  title: 增强组件
  path: /enhance
---

# Select

- 支持高亮搜索（只支持`options`不支持`children`）
- 支持超出部分 tooltip（只支持`options`不支持`children`）
- 内置 label 搜索逻辑

# Bug

- antd `5.9.0 ~ 5.10.0`版本第一次打开 Select Option 时 tooltip 会失效，如需使用 tooltip 特性需避开以上版本

# 代码示例

```jsx
import { Select } from 'antd-enhancer';

export default () => {
  return (
    <Select
      style={{ width: '150px' }}
      showSearch
      highlightSearch
      searchLabel
      tooltip
      options={[
        { label: '小明对对对对对1111', value: 'xiaoming' },
        { label: '小王', value: 'xiaowang' },
        { label: '小张', value: 'xiaozhang' },
      ]}
    />
  );
};
```

# 基本参数

| 参数             | 说明                                         | 类型                   | 默认值 |
| ---------------- | -------------------------------------------- | ---------------------- | ------ |
| highlightSearch  | 搜索高亮，使用该属性必须开启 showSearch      | `bolean`               | false  |
| searchLabel      | label 搜索，若设置 filterOption 此属性将失效 | `bolean`               | false  |
| tooltip          | tooltip 提示                                 | `bolean  \| ReactNode` | false  |
| tooltipClassName | tooltip 样式                                 | `string`               | -      |

[Select 配置参考 antd 文档](https://ant-design.antgroup.com/components/select-cn#api)
