import React, {
  ReactNode,
  CSSProperties,
  useState,
  useMemo,
  useContext
} from 'react';
import { Form, Button, Space, theme, Typography } from 'antd';
import { Callbacks, FormInstance } from 'rc-field-form/lib/interface';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import genDefaultStyle from './jss';
import classNames from 'classnames';
import { useStyleRegister } from '@ant-design/cssinjs';
import { EnhancedConfigContext, ConfigConsumerProps } from "../ConfigProvider"
import defaultLocale from "../ConfigProvider/locales/en";

const { useToken } = theme;

const MAX_LENGTH = 4;

interface Props {
  onSearch?: Callbacks['onFinish'];
  onReset?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  form?: FormInstance<any>;
}

function Index(props: Props) {
  const prefixCls = 'antd-enhancer-filter';
  const {locale = defaultLocale} = useContext<ConfigConsumerProps>(EnhancedConfigContext);
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );

  const { onSearch, onReset, children, style, className, form: preForm } = props;
  const [expand, setExpand] = useState(false);
  const nextChidren = useMemo(
    () => (children instanceof Array ? children.filter(_ => _) : children),
    [children],
  );
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [form] = Form.useForm(preForm as any);
  
  // Form尾部需要补充个数
  const numberOfSupplements =
    MAX_LENGTH - ((React.Children.count(nextChidren) + 1) % MAX_LENGTH);

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  const handleFinish = () => {
    // form.getFieldsValue(): 只获取真实存在的dom节点值
    // form.getFieldsValue(true): form中有值，包括隐藏的dom节点
    onSearch?.(form.getFieldsValue(true));
  };

  return wrapSSR(
    <div className={classNames(prefixCls, hashId, className)} style={style}>
      <Form form={form} layout="inline" onFinish={handleFinish}>
        {React.Children.map(nextChidren, (_, index) => {
          const formItemProps = _.props["data-form-item-props"] || {};
          const count = expand ? React.Children.count(nextChidren) : 3;
          if (index < count) {
            return <Form.Item key={index} {...formItemProps}>{_}</Form.Item>;
          }
        })}
        <div className={classNames(prefixCls + '-button-wrapper', hashId)}>
          <Space>
            <Button type="primary" htmlType="submit">
              {locale.filter.search}
            </Button>
            <Button onClick={handleReset}>{locale.filter.reset}</Button>
            <Typography.Link
              style={{
                display:
                  React.Children.count(nextChidren) <= 3 ? 'none' : 'inline',
              }}
              onClick={() => setExpand(!expand)}
            >
              <Space
                className={classNames(
                  prefixCls + '-button-wrapper-sider',
                  hashId,
                )}
              >
                {expand ? locale.filter.collapse : locale.filter.expand}
                {expand ? <UpOutlined /> : <DownOutlined />}
              </Space>
            </Typography.Link>
          </Space>
        </div>
        {new Array(numberOfSupplements).fill(null).map((_, index) => (
          <div
            className={classNames(prefixCls + '-empty-item', hashId)}
            key={index}
          />
        ))}
      </Form>
    </div>,
  );
}

export default Index;
