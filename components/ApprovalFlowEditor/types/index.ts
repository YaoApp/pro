import type { IEditComponent } from '@/components/common'
import type { Node, Edge } from '@antv/x6'

export interface IPropsApprovalFlowEditor extends IEditComponent {
	approvalPersonsApi: string
	data: {
		nodes: Array<Node.Metadata & { data: ApprovalFlowEditor.ApprovaltemProps }>
		edges: Array<Edge.Metadata & Edge.Label>
	}
}

export interface IPropsApprovalItem {
	node: Node
}

export namespace ApprovalFlowEditor {
	export interface ApprovaltemProps {
		label: string
		type: 'initor' | 'approval' | 'copy'
		title?: string
	}
}
