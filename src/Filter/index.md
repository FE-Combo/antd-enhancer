---
title: Filter
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# Filter

条件筛选框

# 代码示例

```jsx
import { Input, Select } from 'antd';
import { Filter } from 'antd-enhancer';

export default () => {
  return (
    <Filter maxCount={5}>
      <Input
        name="test"
        data-form-item-props={{ label: 'test', name: 'test' }}
        placeholder="请输入"
      />
      <Input
        name="test2"
        data-form-item-props={{ label: 'test2', name: 'test2' }}
        placeholder="请输入"
      />
      <Select
        name="test3"
        data-form-item-props={{ label: 'test3', name: 'test3' }}
        placeholder="请选择"
      />
      <Select
        name="test4"
        data-form-item-props={{ label: 'test3', name: 'test3' }}
        placeholder="请选择"
      />
      <Select
        name="test5"
        data-form-item-props={{ label: 'test3', name: 'test3' }}
        placeholder="请选择"
      />
    </Filter>
  );
};
```

# 基本参数

#### Filter

| 参数        | 说明                                                                                                     | 类型                                                                | 默认值               |
| ----------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------- |
| maxCount    | 一行最多显示个数，超过一行自动隐藏                                                                       | `number`                                                            | 4                    |
| searchText  | 搜索按钮文本                                                                                             | `string`                                                            | en(Search)、zh(搜索) |
| resetText   | 重置按钮文本                                                                                             | `string`                                                            | en(Reset)、zh(重置)  |
| searchProps | 搜索按钮属性                                                                                             | `ButtonProps`                                                       | -                    |
| resetProps  | 重置按钮属性                                                                                             | `ButtonProps`                                                       | -                    |
| onSearch    | 提交表单回调事件                                                                                         | `function(values)`                                                  | -                    |
| onReset     | 重置表单回调事件                                                                                         | `function()=>void`                                                  | -                    |
| style       | 样式                                                                                                     | `CSSProperties`                                                     | -                    |
| className   | 类名                                                                                                     | `string`                                                            | -                    |
| form        | 由外部传入 form 控制表单                                                                                 | [FormInstance](https://ant.design/components/form-cn/#FormInstance) | -                    |
| fixed       | 内容宽度是否影响列的布局，值为 true 代表不影响。当设置为 false 时整个容器多出 marginBottom: token.margin | `boolean`                                                           | true                 |

#### children

child 类型必须是表单组件，通过传入`data-form-item-props`属性，可以设置 [FormItem](https://ant-design.antgroup.com/components/form-cn#formitem) 的属性
