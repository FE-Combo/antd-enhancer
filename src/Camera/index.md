---
title: Camera
order: 1
group:
  order: 1
  title: 拓展组件
  path: /expand
---

# Camera

摄像头

# 代码示例

```jsx
import {useRef, useState} from "react";
import { Button, Space} from "antd";
import { Camera } from 'antd-enhancer';

export default () => {
  const [open, setOpen] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCapture = () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setPhotoDataUrl(dataUrl);
  };
  return (
    <div>
      {open && <Camera open={open} ref={videoRef} />}
      <Space>
        <Button onClick={()=>setOpen(!open)}>开启/关闭摄像头</Button>
        <Button onClick={handleCapture}>拍照</Button>
      </Space>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {photoDataUrl && <img src={photoDataUrl} alt="拍照结果" />}
    </div>
  );
};
```

# 基本参数

| 参数      | 说明           | 类型          | 默认值 |
| --------- | -------------- | ------------- | ------ |
| className | 类名           | string        | -      |
| style     | 样式           | CSSProperties | -      |
| open      | 是否开启摄像头 | boolean       | -      |

更多 Props 请参考：[VideoHTMLAttributes](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.mediahtmlattributes)
