import { useStyleRegister } from '@ant-design/cssinjs';
import { theme } from 'antd';
import classNames from 'classnames';
import React, {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import genDefaultStyle from './jss';

const { useToken } = theme;

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  trigger?: Array<'click' | 'hover'>;
  render?: (options?: {
    isHovered: boolean;
    isClicked: boolean;
  }) => React.ReactNode;
}

export type RefInternalMask = (
  props: PropsWithChildren<Props> & {
    ref?: Ref<HTMLDivElement>;
  },
) => React.ReactElement;

function InternalMask(
  props: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>,
) {
  const prefixCls = 'antd-enhancer-mask';
  const { theme, token, hashId } = useToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genDefaultStyle(prefixCls)],
  );
  const {
    className,
    style,
    trigger = ['hover'],
    children,
    render,
    ...restProps
  } = props;

  const nextRef = (ref || containerRef) as RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (
        trigger.includes('click') &&
        e.target &&
        nextRef.current &&
        !nextRef.current.contains(e.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [trigger]);

  const handleMouseEnter = useCallback(() => {
    if (trigger.includes('hover')) {
      setIsHovered(true);
    }
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger.includes('hover')) {
      setIsHovered(false);
    }
  }, [trigger]);

  const handleClick = useCallback(() => {
    if (trigger.includes('click')) {
      setIsClicked(!isClicked);
    }
  }, [isClicked, trigger]);

  return wrapSSR(
    <div
      ref={nextRef}
      className={classNames(prefixCls, hashId, className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...restProps}
    >
      {children}
      {(isHovered || isClicked) && render?.({ isHovered, isClicked })}
    </div>,
  );
}

const ForwardInternalMask = forwardRef(InternalMask) as RefInternalMask;

function ExternalMask(props: Props, ref: Ref<HTMLDivElement>) {
  return <ForwardInternalMask {...props} ref={ref} />;
}

const ForwardExternalMask = forwardRef(ExternalMask);

ForwardExternalMask.displayName = 'Mask';

export default ForwardExternalMask;
