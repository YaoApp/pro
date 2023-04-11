import type { Node, Edge } from '@antv/x6'

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
