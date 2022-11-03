// Typescript currently unable to condition the never type directly so there is a work around
export type ITarget<T, P = never> = [P] extends [never] ? ITargetWithoutParams<T> : ITargetWithParams<T, P>;

interface ITargetWithoutParams<T> {
	notify(): T;
}

interface ITargetWithParams<T, P> {
	notify(payload: P): T;
}
