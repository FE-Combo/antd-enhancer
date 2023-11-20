import { useStyleRegister } from '@ant-design/cssinjs';
import { theme } from 'antd';
import classNames from 'classnames';
import React, {
  Ref,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

// 获取所有视频设备
export async function getVideoDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((device) => device.kind === 'videoinput');
  return videoDevices;
}

export interface Props
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  open?: boolean | string;
}

export type RefInternalCamera = (
  props: React.PropsWithChildren<Props> & {
    ref?: Ref<HTMLVideoElement>;
  },
) => React.ReactElement;

function InternalCamera(props: Props, ref: Ref<HTMLVideoElement>) {
  const prefixCls = 'antd-enhancer-camera';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );
  const { className, open, autoPlay = true, ...restProps } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const nextRef = (ref || videoRef) as RefObject<HTMLVideoElement>;

  const startCamera = useCallback(() => {
    const constraints =
      typeof open === 'string'
        ? {
            video: { deviceId: { exact: open } },
          }
        : { video: open };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        nextRef.current!.srcObject = stream;
        mediaStreamRef.current = stream;
      })
      .catch((error) => {
        console.error('Unable to get camera: ' + error);
      });
  }, [open]);

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  return wrapSSR(
    <video
      ref={nextRef}
      className={classNames(prefixCls, className)}
      autoPlay={autoPlay}
      {...restProps}
    />,
  );
}

const ForwardInternalCamera = forwardRef(InternalCamera) as RefInternalCamera;

function ExternalCamera(props: Props, ref: Ref<HTMLVideoElement>) {
  return <ForwardInternalCamera {...props} ref={ref} />;
}

const ForwardExternalCamera = forwardRef(ExternalCamera);

ForwardExternalCamera.displayName = 'Camera';

export default ForwardExternalCamera;
