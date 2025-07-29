import { AnimationEasing } from './easing';
import type Animation from './Animation';
type OnframeCallback = (percent: number) => void;
type ondestroyCallback = () => void;
type onrestartCallback = () => void;
export type DeferredEventTypes = 'destroy' | 'restart';
export interface ClipProps {
    life?: number;
    delay?: number;
    loop?: boolean;
    easing?: AnimationEasing;
    onframe?: OnframeCallback;
    ondestroy?: ondestroyCallback;
    onrestart?: onrestartCallback;
}
export default class Clip {
    private _life;
    private _delay;
    private _inited;
    private _startTime;
    private _pausedTime;
    private _paused;
    animation: Animation;
    loop: boolean;
    easing: AnimationEasing;
    easingFunc: (p: number) => number;
    next: Clip;
    prev: Clip;
    onframe: OnframeCallback;
    ondestroy: ondestroyCallback;
    onrestart: onrestartCallback;
    constructor(opts: ClipProps);
    step(globalTime: number, deltaTime: number): boolean;
    pause(): void;
    resume(): void;
    setEasing(easing: AnimationEasing): void;
}
export {};
