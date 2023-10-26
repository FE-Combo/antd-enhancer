---
title: Cell
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# Cell

主题色原子组件

antd 现有问题：https://github.com/ant-design/ant-design/discussions/45412

功能包含：字体颜色、填充颜色、字体大小、行高度、外边距、内边距、圆角大小、阴影、边框颜色、边框

# 代码示例

```jsx
import { Divider } from 'antd';
import { Cell } from 'antd-enhancer';

export default () => {
  return (
    <div>
      <Divider plain />
      <Cell
        colorType="colorPrimary"
        hoverColorType="colorSuccess"
        activeColorType="colorWarning"
        paddingType="paddingXXS"
        marginType="marginXXS"
      >
        colorPrimary
      </Cell>
      <Cell
        colorType="colorSuccess"
        paddingType="paddingXXS"
        marginType="marginXXS"
      >
        colorSuccess
      </Cell>
      <Cell
        colorType="colorWarning"
        paddingType="paddingXXS"
        marginType="marginXXS"
      >
        colorWarning
      </Cell>
      <Cell
        colorType="colorError"
        paddingType="paddingXXS"
        marginType="marginXXS"
      >
        colorError
      </Cell>
      <Divider plain />
      <Cell
        fontSizeType="fontSizeHeading1"
        colorType="colorPrimary"
        fillType="colorFill"
        hoverFillType="colorPrimaryBgHover"
        borderRadiusType="borderRadius"
        paddingType="paddingXS"
        boxShadowType="boxShadow"
        borderColorType="colorPrimary"
        hoverBorderColorType="colorPrimaryHover"
        activeBorderColorType="colorWarningActive"
        style={{ borderWidth: '1px', borderStyle: 'solid' }}
      >
        Cell
      </Cell>
    </div>
  );
};
```

# 基本参数

| 参数                  | 说明             | 类型                                     | 默认值         |
| --------------------- | ---------------- | ---------------------------------------- | -------------- |
| display               | 元素类型         | `inline \| inline-block \| block`        | `inline-block` |
| colorType             | 文本颜色         | `BaseColorType \| ColorType`             | `colorText`    |
| hoverColorType        | 文本 hover 颜色  | `BaseColorType \| HoverColorType`        |                |
| activeColorType       | 文本 active 颜色 | `BaseColorType \| ActiveColorType`       |                |
| fillType              | 背景颜色         | `BaseColorType \| FillType`              |                |
| hoverFillType         | 背景 hover 颜色  | `BaseColorType \| HoverFillType`         |                |
| borderColorType       | 边框颜色         | `BaseColorType \| BorderColorType`       |                |
| hoverBorderColorType  | 边框 hover 颜色  | `BaseColorType \| HoverBorderColorType`  |                |
| activeBorderColorType | 边框 active 颜色 | `BaseColorType \| ActiveBorderColorType` |                |
| fontSizeType          | 文本大小         | `FontSizeType`                           | `fontSize`     |
| borderRadiusType      | 圆角             | `BorderRadiusType`                       |                |
| paddingType           | 内边距           | `PaddingType`                            |                |
| marginType            | 外边距           | `MarginType`                             |                |
| boxShadowType         | 阴影             | `BoxShadowType`                          |                |
