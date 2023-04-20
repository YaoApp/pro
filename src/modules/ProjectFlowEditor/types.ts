import type { IEditComponent } from '@/components'
import type { SensorDescriptor, SensorOptions, DragEndEvent } from '@dnd-kit/core'

export namespace PFE {
	export interface NodeItem {
		id: string
		title: string
		pathname?: string
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
	value: PFE.Rows
}

export interface IPropsRow {
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
	index: number
	insert: (index: number, item: PFE.NodeItem) => void
	remove: (index: number) => void
	replace: (index: number, item: PFE.NodeItem) => void
}
