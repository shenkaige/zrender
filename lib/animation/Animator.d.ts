import Clip from './Clip';
import { ArrayLike, Dictionary } from '../core/types';
import { AnimationEasing } from './easing';
import Animation from './Animation';
type NumberArray = ArrayLike<number>;
type InterpolatableType = string | number | NumberArray | NumberArray[];
export declare function cloneValue(value: InterpolatableType): number | any[];
type ValueType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Keyframe = {
    time: number;
    value: unknown;
    percent: number;
    rawValue: unknown;
    easing?: AnimationEasing;
    easingFunc?: (percent: number) => number;
    additiveValue?: unknown;
};
declare class Track {
    keyframes: Keyframe[];
    propName: string;
    valType: ValueType;
    discrete: boolean;
    _invalid: boolean;
    private _finished;
    private _needsSort;
    private _additiveTrack;
    private _additiveValue;
    private _lastFr;
    private _lastFrP;
    constructor(propName: string);
    isFinished(): boolean;
    setFinished(): void;
    needsAnimate(): boolean;
    getAdditiveTrack(): Track;
    addKeyframe(time: number, rawValue: unknown, easing?: AnimationEasing): Keyframe;
    prepare(maxTime: number, additiveTrack?: Track): void;
    step(target: any, percent: number): void;
    private _addToTarget;
}
type DoneCallback = () => void;
type AbortCallback = () => void;
export type OnframeCallback<T> = (target: T, percent: number) => void;
export type AnimationPropGetter<T> = (target: T, key: string) => InterpolatableType;
export type AnimationPropSetter<T> = (target: T, key: string, value: InterpolatableType) => void;
export default class Animator<T> {
    animation?: Animation;
    targetName?: string;
    scope?: string;
    __fromStateTransition?: string;
    private _tracks;
    private _trackKeys;
    private _target;
    private _loop;
    private _delay;
    private _maxTime;
    private _force;
    private _paused;
    private _started;
    private _allowDiscrete;
    private _additiveAnimators;
    private _doneCbs;
    private _onframeCbs;
    private _abortedCbs;
    private _clip;
    constructor(target: T, loop: boolean, allowDiscreteAnimation?: boolean, additiveTo?: Animator<any>[]);
    getMaxTime(): number;
    getDelay(): number;
    getLoop(): boolean;
    getTarget(): T;
    changeTarget(target: T): void;
    when(time: number, props: Dictionary<any>, easing?: AnimationEasing): this;
    whenWithKeys(time: number, props: Dictionary<any>, propNames: string[], easing?: AnimationEasing): this;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
    duration(duration: number): this;
    private _doneCallback;
    private _abortedCallback;
    private _setTracksFinished;
    private _getAdditiveTrack;
    start(easing?: AnimationEasing): this;
    stop(forwardToLast?: boolean): void;
    delay(time: number): this;
    during(cb: OnframeCallback<T>): this;
    done(cb: DoneCallback): this;
    aborted(cb: AbortCallback): this;
    getClip(): Clip;
    getTrack(propName: string): Track;
    getTracks(): Track[];
    stopTracks(propNames: string[], forwardToLast?: boolean): boolean;
    saveTo(target: T, trackKeys?: readonly string[], firstOrLast?: boolean): void;
    __changeFinalValue(finalProps: Dictionary<any>, trackKeys?: readonly string[]): void;
}
export type AnimatorTrack = Track;
export {};
