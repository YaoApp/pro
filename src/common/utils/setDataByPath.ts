export default (path: Array<string>, data: any, value: any) => {
	let currentObject = data

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]

		if (!currentObject.hasOwnProperty(key)) {
			currentObject[key] = {}
		}

		currentObject = currentObject[key]
	}

	currentObject[path[path.length - 1]] = value
}
