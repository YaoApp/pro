import { deepEqual } from 'fast-equals'

export default <T>(arr: Array<T>, key: string, value: any) => {
	for (let i = 0, len = arr.length; i < len; i++) {
		if (deepEqual((arr[i] as any)[key], value)) {
			arr.splice(i, 1)

			break
		}
	}

	return arr
}
