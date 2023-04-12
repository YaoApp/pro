import { DagreLayout } from '@antv/layout'

import { getEdgeOptions } from '../common'

import type { AFE } from '../types'

const dagre = new DagreLayout({
	type: 'dagre',
	rankdir: 'TB',
	ranksep: 26,
	nodeSize: [210, 72]
})

export default (raw_data: AFE.RawData) => {
	const flow_data: AFE.FlowData = { nodes: [], edges: [] }

	raw_data.forEach((item, index) => {
		const source = item.id
		const target = ''

		flow_data.nodes.push({
			shape: 'Approvaltem',
			id: source,
			data: item
		})

		if (flow_data.edges.length) {
			flow_data.edges[flow_data.edges.length - 1].target = source
		}

		if (index !== raw_data.length - 1) {
			flow_data.edges.push({
				source,
				target,
				...getEdgeOptions(index)
			})
		}
	})

	// @ts-ignore
	return dagre.layout(flow_data) as AFE.FlowData
}
