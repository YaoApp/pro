import type { IEditComponent } from '@/components'
import type { Node, Edge } from '@antv/x6'
import type Model from './model'

export namespace AFE {
	export interface RawDataItem {
		id: string
		uid: number
		label: string
		type: 'initor' | 'approval' | 'copy'
	}

	export type RawData = Array<RawDataItem>

	export interface FlowData {
		nodes: Array<Node.Metadata & { data: RawDataItem }>
		edges: Array<Edge.Metadata & Edge.Label>
	}
}

export interface IPropsApprovalFlowEditor extends IEditComponent {
	usersApi: string
	value: AFE.RawData
	launcher?: {
		title?: string
		icon?: string
	}
	handler?: {
		title?: string
		icon?: string
	}
}

export interface Options extends Pick<IPropsApprovalFlowEditor, 'launcher' | 'handler'> {}

export interface IPropsApprovalItem {
	node: Node
}

export interface IPropsAddButton extends Pick<IPropsApprovalFlowEditor, 'handler'> {
	namespace: string
	id: string
	source: Edge.TerminalData
	target: Edge.TerminalData
}

export interface IPropsDetail {
	namespace: string
	options: Model['services']['user_options']
	current_item: Model['current_item']
	launcher: IPropsApprovalFlowEditor['launcher']
	handler: IPropsApprovalFlowEditor['handler']
	hide: () => void
}
