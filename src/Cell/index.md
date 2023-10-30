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

功能包含：字体颜色、填充颜色、字体大小、行高度、外边距、内边距、圆角大小、阴影、边框颜色、边框、字体粗细

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
        fontWeight="bold"
        colorType="colorPrimary"
        fillType="colorFill"
        hoverFillType="colorPrimaryBgHover"
        borderRadiusType="borderRadius"
        paddingType="paddingXS"
        boxShadowType="boxShadow"
        borderColorType="colorPrimary"
        hoverBorderColorType="colorPrimaryHover"
        activeBorderColorType="colorWarningActive"
        marginType="marginXS"
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
| lineHeightType        | 行高             | `LineHeightType`                         |                |
| fontWeightType        | 文本粗细         | `bold`                                   |                |
| borderRadiusType      | 圆角             | `BorderRadiusType`                       |                |
| paddingType           | 内边距           | `PaddingType`                            |                |
| paddingTopType        | 上内边距         | `PaddingType`                            |                |
| paddingRightType      | 右内边距         | `PaddingType`                            |                |
| paddingBottomType     | 下内边距         | `PaddingType`                            |                |
| paddingLeftType       | 左内边距         | `PaddingType`                            |                |
| marginType            | 外边距           | `MarginType`                             |                |
| marginTopType         | 上外边距         | `MarginType`                             |                |
| marginRightType       | 右外边距         | `MarginType`                             |                |
| marginBottomType      | 下外边距         | `MarginType`                             |                |
| marginLeftType        | 左外边距         | `MarginType`                             |                |
| boxShadowType         | 阴影             | `BoxShadowType`                          |                |

antd 现有问题：https://github.com/ant-design/ant-design/discussions/45412

主题色拓展：https://ant-design.antgroup.com/docs/blog/config-provider-style-cn

组件 props 无法影响组件样式原因：https://ant-design.antgroup.com/docs/blog/css-in-js-cn

props 改变样式方案：https://emotion.sh/docs/@emotion/css
