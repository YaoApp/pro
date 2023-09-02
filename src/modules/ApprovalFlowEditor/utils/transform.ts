import { DagreLayout } from '@antv/layout'

import { getEdgeOptions } from '../common'

import type { AFE } from '../types'

const dagre = new DagreLayout({
	type: 'dagre',
	rankdir: 'TB',
	ranksep: 26,
	nodeSize: [210, 72]
})

import type { IPropsApprovalFlowEditor } from '../types'

interface Options extends Pick<IPropsApprovalFlowEditor, 'launcher' | 'handler'> {}

export default (namespace: string, raw_data: AFE.RawData, { launcher, handler }: Options) => {
	const flow_data: AFE.FlowData = { nodes: [], edges: [] }

	raw_data.forEach((item, index) => {
		const source = item.id
		const target = ''

		flow_data.nodes.push({
			shape: 'Approvaltem',
			id: source,
			data: { ...item, namespace, launcher, handler }
		})

		if (flow_data.edges.length) {
			const prev_edge = flow_data.edges[flow_data.edges.length - 1]

			prev_edge.target = source
			prev_edge.id += `/${source}`
		}

		if (index !== raw_data.length - 1) {
			flow_data.edges.push({
				id: source,
				source,
				target,
				...getEdgeOptions()
			})
		}
	})

	// @ts-ignore
	return dagre.layout(flow_data) as AFE.FlowData
}
