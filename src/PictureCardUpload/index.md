---
title: PictureCardUpload
order: 1
nav:
  order: 1
  title: 拓展组件
  path: /extends
---

# PictureCardUpload

- 支持图片、视频、pdf 预览与图片裁剪
- 默认支持上传文件为 `image/png,image/jpg,image/jpeg`
- 默认限制上传数量为`1`
- 默认最大可上传文件大小为`2M`
- 重写了`onChange`类型（更好的兼容 Form）
- 不再支持 `listType` 属性
- 内置文件大小与文件类型的判断，默认开启

# 代码示例

```jsx
import React, { useState } from 'react';
import { PictureCardUpload } from 'antd-enhancer';
import { Form, Button, Typography } from 'antd';
import { UploadFile } from 'antd/es/upload';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  // 处理非图片格式文件预览逻辑（例如视频文件）
  const handlePreviewFile = async (file: File | Blob) => {
    if (file.type.startsWith('video')) {
      return Promise.resolve('https://vjs.zencdn.net/v/oceans.mp4');
    } else if (
      file.type.startsWith('text') ||
      file.type.startsWith('application')
    ) {
      return Promise.resolve(
        'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      );
    } else {
      return Promise.resolve('');
    }
  };

  return (
    <div>
      <Typography.Text type="secondary">常规使用</Typography.Text>
      <br />
      <br />
      <PictureCardUpload
        accept="image/png,image/jpg,image/jpeg,pptx,video/mp4,text/markdown,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf"
        maxCount={2}
        enableCrop={false}
        size={1024}
        fileList={fileList}
        onChange={setFileList}
        description="照片支持.jpg、png格式，文件控制在2M以内；建议尺寸572*400"
        cropConfig={{ aspect: 2 }}
        previewFile={handlePreviewFile}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      />
      <br />
      <br />
      <br />
      <Typography.Text type="secondary">表单中使用</Typography.Text>
      <br />
      <br />
      <Form>
        <Form.Item
          label="图片上传"
          name="upload"
          rules={[{ required: true, message: '请输入图片' }]}
          valuePropName="fileList"
          initialValue={[]}
        >
          <PictureCardUpload
            maxCount={2}
            size={2}
            description="照片支持.jpg、png格式，文件控制在2M以内；建议尺寸572*400"
            cropConfig={{ aspect: 2, fillColor: '#fff0' }}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </div>
  );
};

```

# 基本参数

| 参数        | 说明                                                | 类型                                                              | 默认值                   |
| ----------- | --------------------------------------------------- | ----------------------------------------------------------------- | ------------------------ | --- |
| size        | 可上传文件大小，单位 M                              | `number`                                                          | 2                        |
| description | 描述文案，位于组件底部                              | `string\|React.ReactNode`                                         | -                        |
| enableCrop  | 是否开启裁剪个功能                                  | `boolean`                                                         | false                    |
| checkFile   | 是否开启内置文件格式和文件大小校验                  | `boolean`                                                         | true                     |
| cropConfig  | 裁剪配置                                            | [ImgCropProps](https://github.com/nanxiaobei/antd-img-crop#props) | -                        |
| onChange    | 重写了 antd Upload 的 onChange，为了更好的兼容 Form | [ImgCropProps](https://github.com/nanxiaobei/antd-img-crop#props) | function(fileList, info) | -   |

[Upload 配置参考 antd 文档](https://ant-design.antgroup.com/components/upload-cn#api)

# Q&A

#### 如何在预览时使用 base64 图片展示？

可在 onPreivew 回调函数中将 file.originFileObj 转换为 base64，具体代码为：

```
import { RcFile, UploadFile } from 'antd/es/upload';

const [previewUploadFile, setPreviewUploadFile] = useState<UploadFile | null>(null);

// file 转 base64
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

const onPreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj as RcFile);
  }
  setPreviewUploadFile(file);
};
```
