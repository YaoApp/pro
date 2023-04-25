import { makeAutoObservable, reaction, toJS } from 'mobx'
import { injectable } from 'tsyringe'

import type { TFE, IPropsProjectFlowEditor } from './types'
import type { IEditComponent } from '@/components'

@injectable()
export default class Index {
	data = [[]] as TFE.Value['data']
	actions = { left: [], right: [] } as TFE.Value['actions']
	detail_type = 'tableform' as 'tableform' | 'actions'
	visible_detail = false
	current_td_index = { tr_index: null, td_index: null } as {
		tr_index: number | null
		td_index: number | null
	}
	current_action_index = { index: null, position: 'left' } as {
		index: number | null
		position: 'left' | 'right'
	}
	trigger = null as IEditComponent['onChange'] | null

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		reaction(
			() => [this.data, this.actions],
			([data, actions]) => this.trigger?.({ data: toJS(data), actions: toJS(actions) })
		)
	}

	init(value: IPropsProjectFlowEditor['value'], onChange: IEditComponent['onChange']) {
		this.data = value?.data?.length
			? value.data
			: [
					[
						{
							type: 'Title',
							label: '未设置'
						}
					]
			  ]
		this.actions.left = value?.actions?.left?.length
			? value.actions.left
			: [
					{
						type: 'api',
						text: '未设置',
						api: ''
					}
			  ]
		this.actions.right = value?.actions?.right?.length
			? value.actions.right
			: [
					{
						type: 'api',
						text: '未设置',
						api: ''
					}
			  ]

		this.trigger = onChange
	}

	get current_td_item() {
		return this.data?.[this.current_td_index.tr_index || 0]?.[this.current_td_index.td_index || 0]
	}

	get current_action_item() {
		return this.actions?.[this.current_action_index.position || 'left']?.[this.current_action_index.index || 0]
	}

	onChange(key: keyof TFE.TableFormItem | keyof TFE.Action, value: any) {
		if (this.detail_type === 'tableform') {
			const target = this.data[this.current_td_index.tr_index!][this.current_td_index.td_index!]

			if (key.indexOf('props_') !== -1) {
				target['props'] = {
					...target['props'],
					[key.replace('props_', '')]: value
				}
			} else {
				target[key as keyof TFE.TableFormItem] = value
			}
		} else {
			const target = this.actions[this.current_action_index.position!][this.current_action_index.index!]

			target[key as keyof TFE.Action] = value
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

		this.data = toJS(this.data)
	}

	insertCol() {
		this.data[this.current_td_index.tr_index!].splice(this.current_td_index.td_index! + 1, 0, {
			type: 'Title',
			label: '未设置'
		})

		this.data = toJS(this.data)
	}

	insertAction() {
		this.actions[this.current_action_index.position].splice(this.current_td_index.td_index! + 1, 0, {
			type: 'api',
			text: '未设置',
			api: ''
		})

		this.actions = toJS(this.actions)
	}

	remove() {
		if (this.detail_type === 'tableform') {
			const current_td_index = toJS(this.current_td_index)

			this.visible_detail = false
			this.current_td_index = { tr_index: null, td_index: null }

			if (this.data[current_td_index.tr_index!].length === 1) {
				this.data.splice(current_td_index.tr_index!, 1)
			} else {
				this.data[current_td_index.tr_index!].splice(current_td_index.td_index!, 1)
			}

			this.data = toJS(this.data)
		} else {
			const current_action_index = toJS(this.current_action_index)

			this.visible_detail = false
			this.current_action_index = { index: null, position: 'left' }

			this.actions[current_action_index.position].splice(current_action_index.index!, 1)

			this.actions = toJS(this.actions)
		}
	}
}
