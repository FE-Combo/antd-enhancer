---
title: PageHeader
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# PageHeader

业头位于页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题、页面内容简介、页面级操作等、页面级导航组成。

# 代码示例

```jsx
import { PageHeader } from 'antd-enhancer';
import { Space, Button, Breadcrumb } from 'antd';

export default () => {
  return (
    <div>
      <PageHeader
        title="PageHeader"
        subTitle="subTitle"
        extra={
          <Space>
            <Button type="primary">测试1</Button>
            <Button>测试2</Button>
          </Space>
        }
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        children
      </PageHeader>
    </div>
  );
};
```

# 基本参数

| 参数       | 说明     | 类型                                                            | 默认值                  |
| ---------- | -------- | --------------------------------------------------------------- | ----------------------- |
| className  | 类名     | string                                                          | -                       |
| style      | 样式     | CSSProperties                                                   | -                       |
| title      | 标题     | ReactNode                                                       | -                       |
| subTitle   | 副标题   | ReactNode                                                       | -                       |
| breadcrumb | 面包屑   | ReactNode                                                       | -                       |
| onBack     | 返回事件 | (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void | -                       |
| backIcon   | 返回图标 | ReactNode                                                       | `<ArrowLeftOutlined />` |
| extra      | 额外操作 | ReactNode                                                       | -                       |
