export interface ITransformer<V, T> {
	transform(value: V): T;
}
