import { useStyleRegister } from '@ant-design/cssinjs';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Upload, theme } from 'antd';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import { UploadRef } from 'antd/es/upload/Upload';
import classNames from 'classnames';
import React, {
  ReactNode,
  Suspense,
  forwardRef,
  lazy,
  useContext,
} from 'react';
import { ConfigConsumerProps, EnhancedConfigContext } from '../ConfigProvider';
import defaultLocale from '../ConfigProvider/locales/en';
import genDefaultStyle from './jss';
import { ImgCropProps } from './type';

const { useToken } = theme;

export type BeforeUploadValueType = void | boolean | string | Blob | File;

export const DEFAULT_ACCEPT = 'image/png,image/jpg,image/jpeg,pptx';

export interface Props<T = any>
  extends Omit<UploadProps<T>, 'onChange' | 'listType'> {
  size?: number; // 文件大小 单位M
  description?: string | ReactNode;
  cropConfig?: Partial<ImgCropProps>;
  children?: ReactNode | undefined;
  enableCrop?: boolean;
  listType?: 'picture-card' | 'picture-circle';
  checkFile?: boolean;
  onChange?: (
    fileList: UploadFile[],
    info: UploadChangeParam<UploadFile<T>>,
  ) => void;
  onError?: (errorType: ErrorType) => void;
}

export enum ErrorType {
  SIZE_EXCCEEDS_LIMIT = 'SIZE_EXCCEEDS_LIMIT',
  FILE_FORMAT_ERROR = 'FILE_FORMAT_ERROR',
  UPLOAD_ERROR = 'UPLOAD_ERROR',
}

const InternalPictureCardUpload: React.ForwardRefRenderFunction<
  UploadRef,
  Props
> = (props, ref) => {
  const prefixCls = 'ka-component-picture-card-upload';
  const { theme, token, hashId } = useToken();

  const { locale = defaultLocale } = useContext<ConfigConsumerProps>(
    EnhancedConfigContext,
  );

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );
  const {
    maxCount = 1,
    size = 2,
    cropConfig,
    beforeUpload,
    description,
    onChange,
    fileList = [],
    enableCrop = false,
    checkFile = true,
    accept,
    children,
    onError,
    listType = 'picture-card',
    ...restProps
  } = props;

  const handleChange: UploadProps['onChange'] = (info) => {
    onChange?.(info.fileList, info);
    if (info?.file?.status === 'error') {
      onError?.(ErrorType.UPLOAD_ERROR);
    }
  };

  const handleBeforeUpload = async (file: RcFile, fileList: RcFile[]) => {
    let result: BeforeUploadValueType | Promise<BeforeUploadValueType> = true;
    const canUploadFile = (accept || DEFAULT_ACCEPT)
      .split(',')
      .includes(file.type);
    const isLtSize = file.size / 1024 / 1024 < size;
    if (!canUploadFile) {
      onError?.(ErrorType.FILE_FORMAT_ERROR);
    }
    if (!isLtSize) {
      onError?.(ErrorType.SIZE_EXCCEEDS_LIMIT);
    }
    if (isLtSize && canUploadFile && beforeUpload) {
      result = await beforeUpload(file, fileList);
    }

    return isLtSize && canUploadFile ? result : Upload.LIST_IGNORE;
  };

  const uploadComponent = () => (
    <Upload
      ref={ref}
      accept={accept || DEFAULT_ACCEPT}
      listType={listType}
      fileList={fileList}
      onChange={handleChange}
      maxCount={maxCount}
      beforeUpload={checkFile ? handleBeforeUpload : beforeUpload}
      {...restProps}
    >
      {fileList.length < maxCount &&
        (children || (
          <div className={classNames(`${prefixCls}-icon`, hashId)}>
            <CloudUploadOutlined />
            <div style={{ marginTop: 8 }}>
              {locale.pictureCardUpload.clickUpload}
            </div>
          </div>
        ))}
    </Upload>
  );

  const withImgCropUploadCompoennt = () => {
    try {
      // 按需导入 antd-img-crop, 避免打包体积过大
      const ImgCrop = lazy(
        () =>
          import(
            /* webpackChunkName: "antd-enhancer-picture-card-upload-img-crop" */ 'antd-img-crop'
          ),
      );
      return (
        <Suspense>
          <ImgCrop rotationSlider showGrid {...cropConfig}>
            {uploadComponent()}
          </ImgCrop>
        </Suspense>
      );
    } catch (error) {
      console.error(error);
      return uploadComponent();
    }
  };

  return wrapSSR(
    <div className={classNames(prefixCls, hashId)}>
      {enableCrop ? withImgCropUploadCompoennt() : uploadComponent()}
      {description}
    </div>,
  );
};

const ForwardInternalPictureCardUpload = forwardRef<UploadRef, Props>(
  InternalPictureCardUpload,
);

type InternalPictureCardUploadType = typeof InternalPictureCardUpload;

type CompoundedComponent<T = any> = InternalPictureCardUploadType & {
  <U extends T>(
    props: React.PropsWithChildren<Props<U>> & React.RefAttributes<any>,
  ): React.ReactElement;
};

const PictureCardUpload =
  ForwardInternalPictureCardUpload as CompoundedComponent;

export default PictureCardUpload;
