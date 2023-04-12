export default (arr: Array<{ op: 'add' | 'replace' | 'remove'; path: Array<any>; value: any }>) => {
	const obj = {} as any

	for (const { path, value } of arr) {
		let current_obj = obj

		for (let i = 0; i < path.length - 1; i++) {
			const key = path[i]

			if (!(key in current_obj)) {
				current_obj[key] = {}
			}

			current_obj = current_obj[key]
		}

		current_obj[path[path.length - 1]] = value
	}

	return obj
}
