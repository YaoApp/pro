import to from 'await-to-js'
import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import type { SelectProps } from 'antd'

@injectable()
export default class Index {
	api = ''
	user_options = [] as SelectProps['options']

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	init(api: string) {
		this.api = api

		this.getUserOptions()
	}

	async getUserOptions() {
		const [err, res] = await to<SelectProps['options']>(window.$axios.get(this.api))

		if (err) return

		this.user_options = res
	}
}
