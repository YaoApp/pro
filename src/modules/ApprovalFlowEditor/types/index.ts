import type { IEditComponent } from '@/components'
import type { Node, Edge } from '@antv/x6'
import type { AFE } from './ApprovalFlowEditor'
import type Model from '../model'

export * from './ApprovalFlowEditor'

export interface IPropsApprovalFlowEditor extends IEditComponent {
	usersApi: string
	data: AFE.RawData
}

export interface IPropsApprovalItem {
	node: Node
}

export interface IPropsAddButton {
	namespace: string
	id: string
	source: Edge.TerminalData
	target: Edge.TerminalData
}

export interface IPropsDetail {
	namespace: string
	options: Model['services']['user_options']
	current_item: Model['current_item']
	hide: () => void
}
