import { useStyleRegister } from '@ant-design/cssinjs';
import { Select, SelectProps, Typography, theme } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import classNames from 'classnames';
import { BaseSelectRef } from 'rc-select';
import { OptionGroupFC } from 'rc-select/lib/OptGroup';
import { OptionFC } from 'rc-select/lib/Option';
import { BaseOptionType, FilterFunc } from 'rc-select/lib/Select';
import React, {
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
  Ref,
  forwardRef,
  useMemo,
  useState,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props extends SelectProps {
  highlightSearch?: boolean;
  searchLabel?: boolean;
  tooltip?: boolean | ((option: DefaultOptionType) => ReactNode) | ReactNode;
  tooltipClassName?: string;
}

export type RefInternalSelect = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement;

type Func = ForwardRefExoticComponent<
  Props & {
    children?: ReactNode;
  } & React.RefAttributes<BaseSelectRef>
> & {
  OptGroup: OptionGroupFC;
  Option: OptionFC;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
};

function InternalSelect(
  props: PropsWithChildren<Props>,
  ref: Ref<BaseSelectRef>,
) {
  const prefixCls = 'antd-enhance-select';
  const { theme, token, hashId } = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls, token)],
  );
  const {
    className = '',
    highlightSearch = false,
    tooltip = false,
    tooltipClassName = '',
    optionLabelProp,
    fieldNames = { label: 'label', value: 'value', options: 'options' },
    searchLabel = false,
    showSearch,
    options: propsOptions,
    children,
    filterOption,
    onSearch,
    onDropdownVisibleChange,
    ...restProps
  } = props;
  const [searchText, setSearchText] = useState<string>();

  function highlightText(text?: string, key?: string) {
    if (key && text && typeof text === 'string' && typeof key === 'string') {
      const newTextArray = text.split('').map((_, i) => {
        return key.toLowerCase().indexOf(_.toLowerCase()) > -1 ? (
          <span
            className={classNames(`${prefixCls}-highlight`, hashId)}
            key={_ + i}
          >
            {_}
          </span>
        ) : (
          _
        );
      });
      return newTextArray;
    } else {
      return text;
    }
  }

  const options = useMemo(() => {
    return propsOptions?.map((option) => {
      const highlightLabel = highlightText(
        option[fieldNames.label || 'label'],
        searchText,
      );
      return {
        ...option,
        // 高亮 label
        highlightLabel: tooltip ? (
          <Typography.Text
            className={classNames(
              `${prefixCls}-tooltip`,
              `${tooltipClassName}`,
              hashId,
            )}
            ellipsis={{
              tooltip:
                typeof tooltip === 'function' ? tooltip(option) : tooltip,
            }}
          >
            {highlightLabel}
          </Typography.Text>
        ) : highlightSearch ? (
          highlightLabel
        ) : undefined,
        // tooltip label
        tooltipLabel: tooltip ? (
          <Typography.Text
            className={classNames(
              `${prefixCls}-tooltip`,
              `${tooltipClassName}`,
              hashId,
            )}
            ellipsis={{
              tooltip:
                typeof tooltip === 'function' ? tooltip(option) : tooltip,
            }}
          >
            {option[fieldNames.label || 'label']}
          </Typography.Text>
        ) : undefined,
      };
    });
  }, [propsOptions, highlightSearch, searchText, tooltip]);

  const handleSearch = (value: string) => {
    if (highlightSearch) {
      setSearchText(value);
    }
    onSearch?.(value);
  };

  const nextFieldNames = useMemo(() => {
    return {
      ...fieldNames,
      label: highlightSearch
        ? 'highlightLabel'
        : tooltip
        ? 'tooltipLabel'
        : fieldNames.label || 'label',
    };
  }, [fieldNames, highlightSearch, tooltip, searchText]);
  const hanldeDropdownVisibleChange = (open: boolean) => {
    if (highlightSearch && !open) {
      // 关闭时清空搜索关键字
      setSearchText(undefined);
    }
    onDropdownVisibleChange?.(open);
  };

  const handleFilterOption: FilterFunc<BaseOptionType> = (input, option) => {
    return option?.[fieldNames.label || 'label']?.includes(input);
  };

  return wrapSSR(
    <Select
      ref={ref}
      className={classNames(prefixCls, `${className}`, hashId)}
      options={options}
      fieldNames={children ? undefined : nextFieldNames}
      optionLabelProp={
        optionLabelProp || (tooltip ? 'tooltipLabel' : undefined)
      }
      onDropdownVisibleChange={hanldeDropdownVisibleChange}
      filterOption={
        filterOption !== null && filterOption !== undefined
          ? filterOption
          : searchLabel
          ? handleFilterOption
          : undefined
      }
      showSearch={showSearch}
      onSearch={handleSearch}
      {...restProps}
    >
      {children}
    </Select>,
  );
}

const ForwardInternalSelect = forwardRef(InternalSelect) as RefInternalSelect;

function ExternalSelect(
  props: PropsWithChildren<Props>,
  ref: Ref<BaseSelectRef>,
) {
  return <ForwardInternalSelect {...props} ref={ref} />;
}

const ForwardExternalSelect = forwardRef(ExternalSelect) as Func;

ForwardExternalSelect.displayName = 'Select';

ForwardExternalSelect.SECRET_COMBOBOX_MODE_DO_NOT_USE =
  Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;

ForwardExternalSelect.Option = Select.Option;

ForwardExternalSelect.OptGroup = Select.OptGroup;

export default ForwardExternalSelect;
