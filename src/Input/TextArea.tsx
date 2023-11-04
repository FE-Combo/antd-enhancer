import { Input } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { TextAreaProps } from 'antd/lib/input';
import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';

export interface InputTextAreaProps extends TextAreaProps {
  trim?: boolean;
}

export type RefInternalInputTextArea = (
  props: React.PropsWithChildren<InputTextAreaProps> & {
    ref?: React.Ref<TextAreaRef>;
  },
) => React.ReactElement;

function InternalInputTextArea(
  props: InputTextAreaProps,
  ref: Ref<TextAreaRef>,
) {
  const {
    className = '',
    trim = false,
    onChange,
    onBlur,
    ...restProps
  } = props;

  const prefixCls = 'antd-enhance-input-textarea';

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (trim) {
      event.target.value = event.target.value.trim();
      onChange?.(event);
    }
    onBlur?.(event);
  };

  return (
    <Input.TextArea
      ref={ref}
      className={classNames(prefixCls, className)}
      onChange={onChange}
      onBlur={handleBlur}
      {...restProps}
    />
  );
}

const ForwardInternalInputTextArea = forwardRef(
  InternalInputTextArea,
) as RefInternalInputTextArea;

function ExternalInputTextArea(
  props: InputTextAreaProps,
  ref: Ref<TextAreaRef>,
) {
  return <ForwardInternalInputTextArea {...props} ref={ref} />;
}

const ForwardExternalInputTextArea = forwardRef(ExternalInputTextArea);

ForwardExternalInputTextArea.displayName = 'InputTextArea';

export default ForwardExternalInputTextArea;
