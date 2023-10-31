import { Menu, MenuProps, MenuRef, Spin } from 'antd';
import { SelectInfo } from 'rc-menu/lib/interface';
import React, {
  ForwardedRef,
  Key,
  Ref,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

// 交集
const intersection = (a: Key[], b: Key[]) => a.filter((v) => b.includes(v));

const pathnameToArray = (value = '') =>
  value
    .split('/')
    .reduce(
      (pre, current) =>
        current
          ? pre.length > 0
            ? [...pre, `${pre[pre.length - 1]}/${current}`]
            : [`/${current}`]
          : [],
      [] as string[],
    );

export type RefInternalRouteMenu = (
  props: React.PropsWithChildren<Props> & {
    ref?: React.Ref<MenuRef>;
  },
) => React.ReactElement;

export interface Props
  extends Omit<
    MenuProps,
    'selectedKeys' | 'onSelect' | 'openKeys' | 'onOpenChange' | 'onChange'
  > {
  value: string;
  onChange?: (value: string) => void;
  accordion?: boolean;
  loading?: boolean;
}

function InternalRouteMenu(props: Props, ref: ForwardedRef<MenuRef>) {
  const {
    value,
    onChange,
    items = [],
    accordion = false,
    loading = false,
    ...restProps
  } = props;
  const [openKey, setOpenKey] = useState<React.Key[]>([]);

  const selectedKeys = useMemo(() => pathnameToArray(value), [value]);

  const levelOneKeys = useMemo(
    () => items.map((_) => _?.key).filter((_) => _) as Key[],
    [items],
  );

  useEffect(() => {
    if (value) {
      if (openKey.length <= 0) {
        setOpenKey(pathnameToArray(value));
      } else {
        setOpenKey([...new Set(openKey.concat(pathnameToArray(value)))]);
      }
    }
  }, [value]);

  const onSelect = useCallback(
    (selectInfo: SelectInfo) => {
      if (accordion) {
        // 只展开当前菜单的父级菜单
        setOpenKey(selectInfo.keyPath);
      }
      onChange?.(selectInfo.key);
    },
    [accordion],
  );

  const onOpenChange = useCallback(
    (openKeys: string[]) => {
      if (accordion) {
        if (openKeys.length > 0) {
          // lastKey 为当前打开菜单
          const lastKey = openKeys.pop()!;
          const nextKeys = openKeys
            .filter((_) => lastKey.includes(_))
            .concat(lastKey);
          if (intersection(levelOneKeys, nextKeys).length > 0) {
            setOpenKey(nextKeys);
            return;
          }
        }
        setOpenKey([]);
      } else {
        setOpenKey(openKeys);
      }
    },
    [accordion, items],
  );

  return (
    <Spin spinning={loading}>
      <Menu
        ref={ref}
        selectedKeys={selectedKeys}
        openKeys={openKey as string[]}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
        items={items}
        {...restProps}
      />
    </Spin>
  );
}

const ForwardInternalRouteMenu = forwardRef(
  InternalRouteMenu,
) as RefInternalRouteMenu;

function ExternalRouteMenu(props: Props, ref: Ref<MenuRef>) {
  return <ForwardInternalRouteMenu {...props} ref={ref} />;
}

const ForwardExternalRouteMenu = forwardRef(ExternalRouteMenu);

ForwardExternalRouteMenu.displayName = 'RouteMenu';

export default memo(ForwardExternalRouteMenu);
