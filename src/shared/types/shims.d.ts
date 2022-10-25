import type { AttributifyAttributes } from '@unocss/preset-attributify';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes{}
}

declare module 'b-tween' {
  interface BTWeenType {
    from?: object;
    to?: object;
    duration?: number;
    delay?: number;
    easing?: string;
    onStart?: (keys?: Record<string, string | number>) => void;
    onUpdate?: (keys?: Record<string, string | number>) => void;
    onFinish?: (keys?: Record<string, string | number>) => void;
    startTime?: number;
    started?: boolean;
    finished?: boolean;
    update?: () => void;
    start?: () => void;
    stop?: () => void;
  };

  export default function BTween(settings?: BTWeenType) => BTWeenType
}
