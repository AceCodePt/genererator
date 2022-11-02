import { IPathToNameValue } from "./path-to-name-value.interface";

export class NativePathToNameValue implements IPathToNameValue {
	transform(pathCollection: string[]): { name: string; value: string }[] {
		const transformedArray: { name: string; value: string }[] = [];
		pathCollection.forEach((path) => {
			// A path might look like: c/dir/dir/file/
			const splitedPath = path.split("/").slice(-2);
			const lastPath = splitedPath[1] || splitedPath[0];
			transformedArray.push({ name: lastPath, value: path });
		});

		return transformedArray;
	}
}
