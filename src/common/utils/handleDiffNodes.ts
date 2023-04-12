import { match } from 'ts-pattern'

import { chunkDiff, mergDiff } from '@/common/utils'

import type { Graph } from '@antv/x6'
import type { DiffItem } from '@/types'
import type { AFE } from '@/ApprovalFlowEditor/types'

type Args = {
	graph: Graph
	diff_nodes: Array<DiffItem>
	diff_edges: Array<DiffItem>
	operation: 'insert' | 'remove' | 'update'
	flow_data_nodes: AFE.FlowData['nodes']
}

export default ({ graph, diff_nodes, diff_edges, operation, flow_data_nodes }: Args) => {
	const edges = graph.getEdges()
	const chunk_diff_nodes = chunkDiff(diff_nodes)
	const is_insert = operation === 'insert'
	const is_remove = operation === 'remove'
	let chunk_diff_nodes_keys = Object.keys(chunk_diff_nodes)

	if (is_remove) chunk_diff_nodes_keys = chunk_diff_nodes_keys.reverse()

	chunk_diff_nodes_keys.forEach((index) => {
		const diff_items = chunk_diff_nodes[index]
		const target = graph.getCellById(flow_data_nodes.at(Number(index))?.id!)

		if (diff_items.length > 1) {
			const new_id = diff_items[0].value
			const changed_node = graph.updateCellId(target, new_id)

			diff_items.shift()

			changed_node.setData(mergDiff(diff_items))
		} else {
			if (is_insert) graph.addNode(diff_items[0].value)
			if (is_remove) target.remove()
		}
	})

	diff_edges.forEach((item) => {
		const target_edge = edges.at(Number(item.path[0]))!

		match(item.op)
			.with('add', () => {
				graph.addEdge(item.value)
			})
			.with('remove', () => {
				target_edge.remove()
			})
			.with('replace', () => {
				const key = item.path[1]

				target_edge.setData({ [key]: item.value })
			})
			.otherwise(() => {})
	})
}
