import { getEdgeOptions } from '../common'

import type { AFE } from '../types'

export default (raw_data: AFE.RawData) => {
	const flow_data: AFE.FlowData = { nodes: [], edges: [] }

	raw_data.forEach((item, index) => {
		const source = item.id
		const target = ''

		flow_data.nodes.push({
			shape: 'Approvaltem',
			id: source,
			x: 0,
			y: index * 150 + 50,
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

	return flow_data
}
