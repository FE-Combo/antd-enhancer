import { useStyleRegister } from '@ant-design/cssinjs';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Form, Space, Typography, theme } from 'antd';
import classNames from 'classnames';
import { Callbacks, FormInstance } from 'rc-field-form/lib/interface';
import React, {
  CSSProperties,
  ReactNode,
  Ref,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ConfigConsumerProps, EnhancedConfigContext } from '../ConfigProvider';
import defaultLocale from '../ConfigProvider/locales/en';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props {
  onSearch?: Callbacks['onFinish'];
  onReset?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  form?: FormInstance<any>;
  searchText?: ReactNode;
  searchProps?: ButtonProps;
  resetText?: ReactNode;
  resetProps?: ButtonProps;
  maxCount?: number;
  fixed?: boolean;
}

export type RefInternalFilter = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<FormInstance>;
  },
) => React.ReactElement;

function InternalFilter(props: Props, ref: Ref<FormInstance>) {
  const prefixCls = 'antd-enhancer-filter';

  const { locale = defaultLocale } = useContext<ConfigConsumerProps>(
    EnhancedConfigContext,
  );

  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );

  const {
    onSearch,
    onReset,
    children,
    style,
    className,
    searchProps,
    resetProps,
    maxCount = 4,
    form: preForm,
    searchText,
    resetText,
    fixed = true,
  } = props;

  const [expand, setExpand] = useState(false);

  const nextChidren = useMemo(
    () => (children instanceof Array ? children.filter((_) => _) : children),
    [children],
  );

  const childrenCount = useMemo(
    () => React.Children.count(nextChidren),
    [maxCount, children],
  );

  // Form尾部需要补充个数
  const numberOfSupplements =
    maxCount - ((React.Children.count(nextChidren) + 1) % maxCount);

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [form] = Form.useForm(preForm as any);

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  const handleFinish = () => {
    // form.getFieldsValue(): 只能获取真实存在的dom节点值; form.getFieldsValue(true): 可以获取包括隐藏的dom节点
    onSearch?.(form.getFieldsValue(true));
  };

  // fixed 时倒数 mod 个无需 margin
  const mod = childrenCount % maxCount;

  return wrapSSR(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    <Form
      ref={ref as any}
      className={classNames(prefixCls, hashId, className)}
      style={{ justifyContent: fixed ? 'space-between' : undefined, ...style }}
      form={form}
      layout="inline"
      onFinish={handleFinish}
    >
      {React.Children.map(nextChidren, (_, index) => {
        const formItemProps = _.props['data-form-item-props'] || {};
        const count = expand ? childrenCount : maxCount - 1;
        if (index < count) {
          return (
            <Form.Item
              key={index}
              {...formItemProps}
              style={{
                width: fixed ? `${(1 / maxCount) * 100}%` : undefined,
                paddingRight: fixed
                  ? (index + 1) % maxCount === 0
                    ? 0
                    : token.padding
                  : token.padding,
                margin:
                  !fixed || (expand && index + 1 + mod <= childrenCount)
                    ? `0 0 ${token.margin}px 0`
                    : 0,
              }}
            >
              {_}
            </Form.Item>
          );
        }
      })}
      <div
        className={classNames(prefixCls + '-button-wrapper', hashId)}
        style={{
          width: fixed ? `${(1 / maxCount) * 100}%` : undefined,
          marginBottom: fixed ? undefined : token.margin,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit" {...searchProps}>
            {searchText ?? locale.filter.search}
          </Button>
          <Button onClick={handleReset} {...resetProps}>
            {resetText ?? locale.filter.reset}
          </Button>
          <Typography.Link
            style={{
              display:
                React.Children.count(nextChidren) <= maxCount - 1
                  ? 'none'
                  : 'inline',
            }}
            onClick={() => setExpand(!expand)}
          >
            <Space
              className={classNames(
                prefixCls + '-button-wrapper-sider',
                hashId,
              )}
            >
              {expand ? (
                <Typography.Text
                  className={classNames(
                    prefixCls + '-button-wrapper-sider-text',
                    hashId,
                  )}
                >
                  <Space>
                    {locale.filter.collapse}
                    <UpOutlined />
                  </Space>
                </Typography.Text>
              ) : (
                <Typography.Text
                  className={classNames(
                    prefixCls + '-button-wrapper-sider-text',
                    hashId,
                  )}
                >
                  <Space>
                    {locale.filter.expand}
                    <DownOutlined />
                  </Space>
                </Typography.Text>
              )}
            </Space>
          </Typography.Link>
        </Space>
      </div>
      {new Array(numberOfSupplements).fill(null).map((_, index) => (
        <div
          className={classNames(prefixCls + '-empty-item', hashId)}
          style={{ width: fixed ? `${(1 / maxCount) * 100}%` : undefined }}
          key={index}
        />
      ))}
    </Form>,
  );
}

const ForwardInternalFilter = forwardRef(InternalFilter) as RefInternalFilter;

function ExternalFilter(props: Props, ref: Ref<FormInstance>) {
  return <ForwardInternalFilter {...props} ref={ref} />;
}

const ForwardExternalFilter = forwardRef(ExternalFilter);

ForwardExternalFilter.displayName = 'Filter';

export default ForwardExternalFilter;
