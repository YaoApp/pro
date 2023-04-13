import { deepEqual } from 'fast-equals'

import type { Graph, Node, Edge } from '@antv/x6'

type Flow = {
	nodes: Node.Metadata[]
	edges: Edge.Metadata[]
}

type Args = {
	graph: Graph
	prev_flow: Flow
	current_flow: Flow
}

export default ({ graph, prev_flow, current_flow }: Args) => {
	graph.batchUpdate(() => {
		prev_flow.nodes.forEach((item) => {
			const exist_item = current_flow.nodes.find((it) => item.id === it.id)
			const node = graph.getCellById(item.id!)

			if (exist_item) {
				if (exist_item.x !== item.x) node.setPropByPath('position/x', exist_item.x)
				if (exist_item.y !== item.y) node.setPropByPath('position/y', exist_item.y)
				if (!deepEqual(exist_item.data, item.data)) node.setData(exist_item.data)
			} else {
				// 节点已被删除的情形
				node.remove()
			}
		})

		// 处理新增节点的情形
		graph.addNodes(
			current_flow.nodes.reduce((total, item) => {
				if (!prev_flow.nodes.find((it) => item.id === it.id)) total.push(item)

				return total
			}, [] as Array<Node.Metadata>)
		)

		prev_flow.edges.forEach((item) => {
			const exist_item = current_flow.edges.find((it) => item.id === it.id)
			const edge = graph.getCellById(item.id!)

			// 边已被删除的情形
			if (!exist_item && edge) edge.remove()
		})

		// 处理新增边的情形
		graph.addEdges(
			current_flow.edges.reduce((total, item) => {
				if (!prev_flow.edges.find((it) => item.id === it.id)) total.push(item)

				return total
			}, [] as Array<Edge.Metadata>)
		)
	})
}
