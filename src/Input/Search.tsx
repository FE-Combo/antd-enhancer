import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import classNames from 'classnames';
import { InputRef } from 'rc-input';
import React, { Ref, forwardRef } from 'react';

export interface InputSearchProps extends SearchProps {
  trim?: boolean;
}

export type RefInternalInputSearch = (
  props: React.PropsWithChildren<InputSearchProps> & {
    ref?: React.Ref<InputRef>;
  },
) => React.ReactElement;

function InternalInputSearch(props: InputSearchProps, ref: Ref<InputRef>) {
  const {
    className = '',
    trim = false,
    onChange,
    onBlur,
    ...restProps
  } = props;

  const prefixCls = 'antd-enhance-input-search';

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (trim) {
      event.target.value = event.target.value.trim();
      onChange?.(event);
    }
    onBlur?.(event);
  };

  return (
    <Input.Search
      ref={ref}
      className={classNames(prefixCls, className)}
      onChange={onChange}
      onBlur={handleBlur}
      {...restProps}
    />
  );
}

const ForwardInternalInputSearch = forwardRef(
  InternalInputSearch,
) as RefInternalInputSearch;

function ExternalInputSearch(props: InputSearchProps, ref: Ref<InputRef>) {
  return <ForwardInternalInputSearch {...props} ref={ref} />;
}

const ForwardExternalInputSearch = forwardRef(ExternalInputSearch);

ForwardExternalInputSearch.displayName = 'InputSearch';

export default ForwardExternalInputSearch;
