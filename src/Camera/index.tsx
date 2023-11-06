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

export interface Props
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  open?: boolean;
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
  const nextRef = (ref || videoRef) as RefObject<HTMLVideoElement>;

  const startCamera = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        nextRef.current!.srcObject = stream;
      })
      .catch((error) => {
        console.error('Unable to get camera: ' + error);
      });
  }, []);

  useEffect(() => {
    if (open) {
      startCamera();
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
