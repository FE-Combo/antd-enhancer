---
title: 介绍
---

## 宗旨
优化 Ant Design（Antd）使用，简化组件配置，扩展Antd以涵盖更多通用组件，从而提升开发体验并降低开发成本。

## 安装

```bash
yarn add antd-enhancer --save
```

## 使用

```bash
import { Table } from 'antd-enhancer';
```

## 按需加载
新增 babel 配置

```bash
  [
    "import",
    {
      "libraryName": "antd-enhancer",
      "libraryDirectory": "es",
      "camel2DashComponentName": false
    },
    "antd-enhancer"
  ]
```