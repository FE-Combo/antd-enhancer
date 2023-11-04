import { Input, InputProps } from 'antd';
import { GroupProps, PasswordProps } from 'antd/lib/input';
import classNames from 'classnames';
import { InputRef } from 'rc-input';
import React, {
  FC,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  forwardRef,
} from 'react';
import Search, { InputSearchProps } from './Search';
import TextArea, { InputTextAreaProps } from './TextArea';

export interface Props extends InputProps {
  trim?: boolean;
}

type InputType = ForwardRefExoticComponent<Props & RefAttributes<InputRef>> & {
  Search: FC<InputSearchProps>;
  TextArea: FC<InputTextAreaProps>;
  Password: FC<PasswordProps>;
  Group: FC<GroupProps>;
};

export type RefInternalInput = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<InputRef>;
  },
) => React.ReactElement;

function InternalInput(props: Props, ref: Ref<InputRef>) {
  const {
    className = '',
    trim = false,
    onChange,
    onBlur,
    ...restProps
  } = props;

  const prefixCls = 'antd-enhance-input';

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (trim) {
      event.target.value = event.target.value.trim();
      onChange?.(event);
    }
    onBlur?.(event);
  };

  return (
    <Input
      ref={ref}
      className={classNames(prefixCls, className)}
      onChange={onChange}
      onBlur={handleBlur}
      {...restProps}
    />
  );
}

const ForwardInternalInput = forwardRef(InternalInput) as RefInternalInput;

function ExternalInput(props: Props, ref: Ref<InputRef>) {
  return <ForwardInternalInput {...props} ref={ref} />;
}

const ForwardExternalInput = forwardRef(ExternalInput) as InputType;

ForwardExternalInput.displayName = 'Input';

ForwardExternalInput.Search = Search;

ForwardExternalInput.TextArea = TextArea;

ForwardExternalInput.Password = Input.Password;

ForwardExternalInput.Group = Input.Group;

export default ForwardExternalInput;
