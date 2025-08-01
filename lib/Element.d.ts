import Transformable, { TransformProp } from './core/Transformable';
import { AnimationEasing } from './animation/easing';
import Animator from './animation/Animator';
import { ZRenderType } from './zrender';
import { Dictionary, ElementEventName, ZRRawEvent, BuiltinTextPosition, MapToType } from './core/types';
import Path from './graphic/Path';
import BoundingRect, { RectLike } from './core/BoundingRect';
import Eventful from './core/Eventful';
import ZRText from './graphic/Text';
import { TextPositionCalculationResult } from './contain/text';
import Polyline from './graphic/shape/Polyline';
import Group from './graphic/Group';
import Point from './core/Point';
export interface ElementAnimateConfig {
    duration?: number;
    delay?: number;
    easing?: AnimationEasing;
    during?: (percent: number) => void;
    done?: Function;
    aborted?: Function;
    scope?: string;
    force?: boolean;
    additive?: boolean;
    setToFinal?: boolean;
}
export interface ElementTextConfig {
    position?: BuiltinTextPosition | (number | string)[];
    rotation?: number;
    layoutRect?: RectLike;
    offset?: number[];
    origin?: (number | string)[] | 'center';
    distance?: number;
    local?: boolean;
    insideFill?: string;
    insideStroke?: string;
    outsideFill?: string;
    outsideStroke?: string;
    inside?: boolean;
    autoOverflowArea?: boolean;
}
export interface ElementTextGuideLineConfig {
    anchor?: Point;
    showAbove?: boolean;
    candidates?: ('left' | 'top' | 'right' | 'bottom')[];
}
export interface ElementEvent {
    type: ElementEventName;
    event: ZRRawEvent;
    target: Element;
    topTarget: Element;
    cancelBubble: boolean;
    offsetX: number;
    offsetY: number;
    gestureEvent: string;
    pinchX: number;
    pinchY: number;
    pinchScale: number;
    wheelDelta: number;
    zrByTouch: boolean;
    which: number;
    stop: (this: ElementEvent) => void;
}
export type ElementEventCallback<Ctx, Impl> = (this: CbThis<Ctx, Impl>, e: ElementEvent) => boolean | void;
type CbThis<Ctx, Impl> = unknown extends Ctx ? Impl : Ctx;
interface ElementEventHandlerProps {
    onclick: ElementEventCallback<unknown, unknown>;
    ondblclick: ElementEventCallback<unknown, unknown>;
    onmouseover: ElementEventCallback<unknown, unknown>;
    onmouseout: ElementEventCallback<unknown, unknown>;
    onmousemove: ElementEventCallback<unknown, unknown>;
    onmousewheel: ElementEventCallback<unknown, unknown>;
    onmousedown: ElementEventCallback<unknown, unknown>;
    onmouseup: ElementEventCallback<unknown, unknown>;
    oncontextmenu: ElementEventCallback<unknown, unknown>;
    ondrag: ElementEventCallback<unknown, unknown>;
    ondragstart: ElementEventCallback<unknown, unknown>;
    ondragend: ElementEventCallback<unknown, unknown>;
    ondragenter: ElementEventCallback<unknown, unknown>;
    ondragleave: ElementEventCallback<unknown, unknown>;
    ondragover: ElementEventCallback<unknown, unknown>;
    ondrop: ElementEventCallback<unknown, unknown>;
}
export interface ElementProps extends Partial<ElementEventHandlerProps>, Partial<Pick<Transformable, TransformProp>> {
    name?: string;
    ignore?: boolean;
    isGroup?: boolean;
    draggable?: boolean | 'horizontal' | 'vertical';
    silent?: boolean;
    ignoreHostSilent?: boolean;
    ignoreClip?: boolean;
    globalScaleRatio?: number;
    textConfig?: ElementTextConfig;
    textContent?: ZRText;
    clipPath?: Path;
    drift?: Element['drift'];
    extra?: Dictionary<unknown>;
    anid?: string;
}
export declare const PRESERVED_NORMAL_STATE = "__zr_normal__";
declare const PRIMARY_STATES_KEYS: ["x" | "y" | "originX" | "originY" | "anchorX" | "anchorY" | "rotation" | "scaleX" | "scaleY" | "skewX" | "skewY", "ignore"];
export type ElementStatePropNames = (typeof PRIMARY_STATES_KEYS)[number] | 'textConfig';
export type ElementState = Pick<ElementProps, ElementStatePropNames> & ElementCommonState;
export type ElementCommonState = {
    hoverLayer?: boolean;
};
export type ElementCalculateTextPosition = (out: TextPositionCalculationResult, style: ElementTextConfig, rect: RectLike) => TextPositionCalculationResult;
interface Element<Props extends ElementProps = ElementProps> extends Transformable, Eventful<{
    [key in ElementEventName]: (e: ElementEvent) => void | boolean;
} & {
    [key in string]: (...args: any) => void | boolean;
}>, ElementEventHandlerProps {
}
declare class Element<Props extends ElementProps = ElementProps> {
    id: number;
    type: string;
    name: string;
    ignore: boolean;
    silent: boolean;
    ignoreHostSilent: boolean;
    isGroup: boolean;
    draggable: boolean | 'horizontal' | 'vertical';
    dragging: boolean;
    parent: Group;
    animators: Animator<any>[];
    ignoreClip: boolean;
    __hostTarget: Element;
    __zr: ZRenderType;
    __dirty: number;
    __isRendered: boolean;
    __inHover: boolean;
    __clipPaths?: Path[];
    private _clipPath?;
    private _textContent?;
    private _textGuide?;
    textConfig?: ElementTextConfig;
    textGuideLineConfig?: ElementTextGuideLineConfig;
    anid: string;
    extra: Dictionary<unknown>;
    currentStates?: string[];
    prevStates?: string[];
    states: Dictionary<ElementState>;
    stateTransition: ElementAnimateConfig;
    stateProxy?: (stateName: string, targetStates?: string[]) => ElementState;
    protected _normalState: ElementState;
    private _innerTextDefaultStyle;
    constructor(props?: Props);
    protected _init(props?: Props): void;
    drift(dx: number, dy: number, e?: ElementEvent): void;
    beforeUpdate(): void;
    afterUpdate(): void;
    update(): void;
    updateInnerText(forceUpdate?: boolean): void;
    protected canBeInsideText(): boolean;
    protected getInsideTextFill(): string | undefined;
    protected getInsideTextStroke(textFill: string): string | undefined;
    protected getOutsideFill(): string | undefined;
    protected getOutsideStroke(textFill: string): string;
    traverse<Context>(cb: (this: Context, el: Element<Props>) => void, context?: Context): void;
    protected attrKV(key: string, value: unknown): void;
    hide(): void;
    show(): void;
    attr(keyOrObj: Props): this;
    attr<T extends keyof Props>(keyOrObj: T, value: Props[T]): this;
    saveCurrentToNormalState(toState: ElementState): void;
    protected _innerSaveToNormal(toState: ElementState): void;
    protected _savePrimaryToNormal(toState: Dictionary<any>, normalState: Dictionary<any>, primaryKeys: readonly string[]): void;
    hasState(): boolean;
    getState(name: string): ElementState;
    ensureState(name: string): ElementState;
    clearStates(noAnimation?: boolean): void;
    useState(stateName: string, keepCurrentStates?: boolean, noAnimation?: boolean, forceUseHoverLayer?: boolean): ElementState;
    useStates(states: string[], noAnimation?: boolean, forceUseHoverLayer?: boolean): void;
    isSilent(): boolean;
    private _updateAnimationTargets;
    removeState(state: string): void;
    replaceState(oldState: string, newState: string, forceAdd: boolean): void;
    toggleState(state: string, enable: boolean): void;
    protected _mergeStates(states: ElementState[]): ElementState;
    protected _applyStateObj(stateName: string, state: ElementState, normalState: ElementState, keepCurrentStates: boolean, transition: boolean, animationCfg: ElementAnimateConfig): void;
    private _attachComponent;
    private _detachComponent;
    getClipPath(): Path<import("./graphic/Path").PathProps>;
    setClipPath(clipPath: Path): void;
    removeClipPath(): void;
    getTextContent(): ZRText;
    setTextContent(textEl: ZRText): void;
    setTextConfig(cfg: ElementTextConfig): void;
    removeTextConfig(): void;
    removeTextContent(): void;
    getTextGuideLine(): Polyline;
    setTextGuideLine(guideLine: Polyline): void;
    removeTextGuideLine(): void;
    markRedraw(): void;
    dirty(): void;
    private _toggleHoverLayerFlag;
    addSelfToZr(zr: ZRenderType): void;
    removeSelfFromZr(zr: ZRenderType): void;
    animate(key?: string, loop?: boolean, allowDiscreteAnimation?: boolean): Animator<any>;
    addAnimator(animator: Animator<any>, key: string): void;
    updateDuringAnimation(key: string): void;
    stopAnimation(scope?: string, forwardToLast?: boolean): this;
    animateTo(target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>): void;
    animateFrom(target: Props, cfg: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>): void;
    protected _transitionState(stateName: string, target: Props, cfg?: ElementAnimateConfig, animationProps?: MapToType<Props, boolean>): void;
    getBoundingRect(): BoundingRect;
    getPaintRect(): BoundingRect;
    calculateTextPosition: ElementCalculateTextPosition;
    protected static initDefaultProps: void;
}
export default Element;
