import type { IEditComponent } from '@/common'
import type { Node, Edge } from '@antv/x6'
import type { AFE } from './ApprovalFlowEditor'

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
	source: Edge.TerminalCellLooseData
	target: Edge.TerminalCellLooseData
}
