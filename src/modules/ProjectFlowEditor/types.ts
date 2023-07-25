import type { IEditComponent } from '@/components'
import type { SensorDescriptor, SensorOptions, DragEndEvent } from '@dnd-kit/core'
import type { SelectProps } from 'antd'

export namespace PFE {
	export interface NodeItem {
		id: string
		title: string
		pathname?: string
		desc?: string
	}

	export type Nodes = Array<NodeItem>

	export interface RowItem {
		id: string
		title: string
		items: Nodes
	}

	export type Rows = Array<RowItem>
}

export interface IPropsProjectFlowEditor extends IEditComponent {
	formsApi: string
	value: PFE.Rows
}

export interface IPropsRow {
	form_options: SelectProps['options']
	row: PFE.RowItem
	index: number
	sensors: Array<SensorDescriptor<SensorOptions>>
	insert: (index: number, item: PFE.RowItem) => void
	remove: (index: number) => void
	replace: (index: number, item: PFE.RowItem) => void
	getOnDragEnd: (
		list: Array<any>,
		move: (oldIndex: number, newIndex: number) => void
	) => ({ active, over }: DragEndEvent) => void
}

export interface IPropsNode extends PFE.NodeItem {
	form_options: SelectProps['options']
	index: number
	insert: (index: number, item: PFE.NodeItem) => void
	remove: (index: number) => void
	replace: (index: number, item: PFE.NodeItem) => void
}
