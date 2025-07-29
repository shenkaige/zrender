export type Dictionary<T> = {
    [key: string]: T;
};
export type ArrayLike<T> = {
    [key: number]: T;
    length: number;
};
export type NullUndefined = null | undefined;
export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export type TextVerticalAlign = 'top' | 'middle' | 'bottom';
export type TextAlign = 'left' | 'center' | 'right';
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
export type FontStyle = 'normal' | 'italic' | 'oblique';
export type BuiltinTextPosition = 'left' | 'right' | 'top' | 'bottom' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideTopRight' | 'insideBottomLeft' | 'insideBottomRight';
export type WXCanvasRenderingContext = CanvasRenderingContext2D & {
    draw: () => void;
};
export type ZRCanvasRenderingContext = CanvasRenderingContext2D & {
    dpr: number;
    __attrCachedBy: boolean | number;
};
type ZREventProperties = {
    zrX: number;
    zrY: number;
    zrDelta: number;
    zrEventControl: 'no_globalout' | 'only_globalout';
    zrByTouch: boolean;
};
export type ZRRawMouseEvent = MouseEvent & ZREventProperties;
export type ZRRawTouchEvent = TouchEvent & ZREventProperties;
export type ZRRawPointerEvent = TouchEvent & ZREventProperties;
export type ZRRawEvent = ZRRawMouseEvent | ZRRawTouchEvent | ZRRawPointerEvent;
export type ZRPinchEvent = ZRRawEvent & {
    pinchScale: number;
    pinchX: number;
    pinchY: number;
    gestureEvent: string;
};
export type ElementEventName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' | 'mouseover' | 'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu' | 'drag' | 'dragstart' | 'dragend' | 'dragenter' | 'dragleave' | 'dragover' | 'drop' | 'globalout';
export type ElementEventNameWithOn = 'onclick' | 'ondblclick' | 'onmousewheel' | 'onmouseout' | 'onmouseup' | 'onmousedown' | 'onmousemove' | 'oncontextmenu' | 'ondrag' | 'ondragstart' | 'ondragend' | 'ondragenter' | 'ondragleave' | 'ondragover' | 'ondrop';
export type RenderedEvent = {
    elapsedTime: number;
};
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type AllPropTypes<T> = PropType<T, keyof T>;
export type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export type MapToType<T extends Dictionary<any>, S> = {
    [P in keyof T]: T[P] extends Dictionary<any> ? MapToType<T[P], S> : S;
};
export type KeyOfDistributive<T> = T extends unknown ? keyof T : never;
export type WithThisType<Func extends (...args: any) => any, This> = (this: This, ...args: Parameters<Func>) => ReturnType<Func>;
export {};
