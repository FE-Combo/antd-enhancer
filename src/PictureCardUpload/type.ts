import { ModalProps } from 'antd';
import { UploadProps } from 'antd/es/upload';

export type BeforeUpload = Exclude<UploadProps['beforeUpload'], undefined>;

export type BeforeUploadReturnType = ReturnType<BeforeUpload>;

export type ImgCropProps = {
  quality?: number;
  fillColor?: string;
  zoomSlider?: boolean;
  rotationSlider?: boolean;
  aspectSlider?: boolean;
  showReset?: boolean;
  resetText?: string;
  aspect?: number;
  minZoom?: number;
  maxZoom?: number;
  cropShape?: 'rect' | 'round';
  showGrid?: boolean;
  cropperProps?: Omit<
    CropperProps,
    | 'image'
    | 'crop'
    | 'zoom'
    | 'rotation'
    | 'aspect'
    | 'minZoom'
    | 'maxZoom'
    | 'zoomWithScroll'
    | 'cropShape'
    | 'showGrid'
    | 'onCropChange'
    | 'onZoomChange'
    | 'onRotationChange'
    | 'onCropComplete'
    | 'classes'
  >;
  modalClassName?: string;
  modalTitle?: string;
  modalWidth?: number | string;
  modalOk?: string;
  modalCancel?: string;
  onModalOk?: (value: BeforeUploadReturnType) => void;
  onModalCancel?: (resolve: (value: BeforeUploadReturnType) => void) => void;
  modalProps?: Omit<
    ModalProps,
    | 'className'
    | 'title'
    | 'width'
    | 'okText'
    | 'cancelText'
    | 'onOk'
    | 'onCancel'
    | 'open'
    | 'visible'
    | 'wrapClassName'
    | 'maskClosable'
    | 'destroyOnClose'
  >;
  beforeCrop?: BeforeUpload;
  children: JSX.Element;
};

export type CropperProps = {
  image?: string;
  video?: string | VideoSrc[];
  transform?: string;
  crop: Point;
  zoom: number;
  rotation: number;
  aspect: number;
  minZoom: number;
  maxZoom: number;
  cropShape: 'rect' | 'round';
  cropSize?: Size;
  objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
  showGrid?: boolean;
  zoomSpeed: number;
  zoomWithScroll?: boolean;
  onCropChange: (location: Point) => void;
  onZoomChange?: (zoom: number) => void;
  onRotationChange?: (rotation: number) => void;
  onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCropAreaChange?: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onCropSizeChange?: (cropSize: Size) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
  onMediaLoaded?: (mediaSize: MediaSize) => void;
  style: {
    containerStyle?: React.CSSProperties;
    mediaStyle?: React.CSSProperties;
    cropAreaStyle?: React.CSSProperties;
  };
  classes: {
    containerClassName?: string;
    mediaClassName?: string;
    cropAreaClassName?: string;
  };
  restrictPosition: boolean;
  mediaProps:
    | React.ImgHTMLAttributes<HTMLElement>
    | React.VideoHTMLAttributes<HTMLElement>;
  disableAutomaticStylesInjection?: boolean;
  initialCroppedAreaPixels?: Area;
  initialCroppedAreaPercentages?: Area;
  onTouchRequest?: (e: React.TouchEvent<HTMLDivElement>) => boolean;
  onWheelRequest?: (e: WheelEvent) => boolean;
  setImageRef?: (ref: React.RefObject<HTMLImageElement>) => void;
  setVideoRef?: (ref: React.RefObject<HTMLVideoElement>) => void;
  setMediaSize?: (size: MediaSize) => void;
  setCropSize?: (size: Size) => void;
  nonce?: string;
};

export type Size = {
  width: number;
  height: number;
};
export type MediaSize = {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};
export type Point = {
  x: number;
  y: number;
};
export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};
export type VideoSrc = {
  src: string;
  type?: string;
};
