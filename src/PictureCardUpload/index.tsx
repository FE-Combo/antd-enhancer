import { useStyleRegister } from '@ant-design/cssinjs';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Typography, Upload, theme } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/es/upload';
import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { ConfigConsumerProps, EnhancedConfigContext } from '../ConfigProvider';
import defaultLocale from '../ConfigProvider/locales/en';
import genDefaultStyle from './jss';

const { useToken } = theme;

export type BeforeUploadValueType = void | boolean | string | Blob | File;

export const DEFAULT_ACCEPT = 'image/png,image/jpg,image/jpeg,pptx';

export interface Props<T>
  extends Omit<UploadProps<T>, 'onChange' | 'listType'> {
  size?: number; // 文件大小 单位M
  description?: string | ReactNode;
  cropConfig?: Partial<ImgCropProps>;
  children?: ReactNode | undefined;
  enableCrop?: boolean;
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
}

function Index<T>(props: Props<T>) {
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
    ...restProps
  } = props;

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status && info.file.status !== 'error') {
      onChange?.(info.fileList, info);
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
    return isLtSize && canUploadFile ? result : Promise.reject(true);
  };

  const uploadComponent = () => (
    <Upload
      accept={accept || DEFAULT_ACCEPT}
      listType="picture-card"
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

  return wrapSSR(
    <div className={classNames(prefixCls, hashId)}>
      {enableCrop ? (
        <ImgCrop rotationSlider showGrid {...cropConfig}>
          {uploadComponent()}
        </ImgCrop>
      ) : (
        uploadComponent()
      )}
      {description && (
        <Typography.Text
          className={classNames(prefixCls + '-description', hashId)}
          type="secondary"
        >
          {description}
        </Typography.Text>
      )}
    </div>,
  );
}

export default Index;
