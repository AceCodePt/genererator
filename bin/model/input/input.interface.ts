// Typescript currently unable to condition the never type directly so there is a work around
export type IInput<T, P = never> = [P] extends [never] ? IInputWithoutParams<T> : IInputWithParams<T, P>;

interface IInputWithoutParams<T> {
	run(): Promise<T>;
}

interface IInputWithParams<T, P> {
	run(payload: P): Promise<T>;
}
