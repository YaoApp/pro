import { makeAutoObservable, toJS } from 'mobx'
import { injectable } from 'tsyringe'

import data from './data'

import type { TFE } from './types'

@injectable()
export default class Index {
	data = data as TFE.Value['data']
	visible_detail = false
	current_td_index = { tr_index: null, td_index: null } as {
		tr_index: number | null
		td_index: number | null
	}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	get current_td_item() {
		return this.data[this.current_td_index.tr_index || 0][this.current_td_index.td_index || 0]
	}

	onChange(key: keyof TFE.TableFormItem, value: any) {
		const target = this.data[this.current_td_index.tr_index!][this.current_td_index.td_index!]

		if (key.indexOf('props_') !== -1) {
			target['props'] = {
				...target['props'],
				[key.replace('props_', '')]: value
			}
		} else {
			target[key] = value
		}

		this.data = toJS(this.data)
	}

	insertRow() {
		this.data.splice(this.current_td_index.tr_index! + 1, 0, [
			{
				type: 'Title',
				label: '未设置'
			}
		])
	}

	insertCol() {
		this.data[this.current_td_index.tr_index!].splice(this.current_td_index.td_index! + 1, 0, {
			type: 'Title',
			label: '未设置'
		})
	}

	remove() {
		const current_td_index = toJS(this.current_td_index)

		this.visible_detail = false
		this.current_td_index = { tr_index: null, td_index: null }

		if (this.data[current_td_index.tr_index!].length === 1) {
			this.data.splice(current_td_index.tr_index!, 1)
		} else {
			this.data[current_td_index.tr_index!].splice(current_td_index.td_index!, 1)
		}
	}
}
