import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import type { TFE } from './types'

@injectable()
export default class Index {
	visible_detail = false
	current_td_item = {} as TFE.TableFormItem
	current_td_index = { tr_index: null, td_index: null } as {
		tr_index: number | null
		td_index: number | null
	}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
}
