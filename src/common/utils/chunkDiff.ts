export default (arr: Array<{ op: 'add' | 'replace' | 'remove'; path: Array<any>; value: any }>) => {
	const result = {} as any
	let currentPath = null as null | number
	let currentChunk = []

	for (let i = 0; i < arr.length; i++) {
		const path = arr[i].path.shift()

		if (arr[i].path.length) arr[i].path.shift()

		if (currentPath && path !== currentPath && currentChunk.length > 0) {
			result[currentPath] = currentChunk
			currentChunk = []
		}

		currentChunk.push(arr[i])
		currentPath = path
	}

	if (currentPath && currentChunk.length > 0) {
		result[currentPath] = currentChunk
	}

	return result
}
