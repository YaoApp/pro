import type { IEditComponent } from '@/components'
import type Model from './model'

export namespace TFE {
	export interface Action {
		text: string
		bgColor: string
		textColor: string
		api: string
		afterClose?: boolean
	}

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
		data: Array<TableFormItem>
		help: string
		actions: {
			left: Array<Action>
			right: Array<Action>
		}
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
	current_td_item: Model['current_td_item']
}
