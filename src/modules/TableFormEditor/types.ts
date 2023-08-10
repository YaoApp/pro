import type { IEditComponent } from '@/components'
import type Model from './model'

export namespace TFE {
	export interface ApiAction {
		type: 'api'
		text: string
		api: string
		isPrimary?: boolean
	}

	export interface InfoAction {
		type: 'info'
		text: string
		info: string
	}

	export type Action = ApiAction | InfoAction

	export interface TableFormItem {
		type: 'Title' | 'Input' | 'Checkbox' | 'Radio'
		label: string
		value?: any
		prefix?: string
		suffix?: string
		tips?: string
		rowSpan?: number
		colSpan?: number
		props?: any
	}

	export interface Value {
		data: Array<Array<TableFormItem>>
		actions: {
			left: Array<Action>
			right: Array<Action>
		}
	}

	export interface Metadata {
		type:
			| 'select'
			| 'string'
			| 'number'
			| 'boolean'
			| 'any'
			| 'Array<string>'
			| 'textarea'
			| 'richtext'
		label: string
		options?: Array<{ type: string; label: string }>
	}
}

export interface IPropsProjectFlowEditor extends IEditComponent {
	value: TFE.Value
}

export interface IPropsTd {
	td: TFE.TableFormItem
	tr_index: number
	td_index: number
	current_td_index: Model['current_td_index']
	onTd: (tr_index: number, td_index: number) => void
}

export interface IPropsDetail {
	detail_type: Model['detail_type']
	current_td_item: Model['current_td_item']
	current_action_item: Model['current_action_item']
	onChange: Model['onChange']
	insertRow: Model['insertRow']
	insertCol: Model['insertCol']
	insertAction: Model['insertAction']
	remove: Model['remove']
	hideDetail: () => void
}

export interface IPropsMetaItem {
	k: keyof TFE.TableFormItem
	v: TFE.Metadata
	value: any
	onChange: IPropsDetail['onChange']
}

export interface IPropsActions {
	actions: Model['actions']
	current_action_index: Model['current_action_index']
	onAction: (index: number, position: 'left' | 'right') => void
}
