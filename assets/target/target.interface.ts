export interface ITarget<T, P> {
	notify(data: P): T;
}
