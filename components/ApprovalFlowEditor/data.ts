import { Markup } from '@antv/x6'

import type { IPropsApprovalFlowEditor } from './types'

const common_edge_options = {
	label: { position: 0 },
	defaultLabel: {
		markup: Markup.getForeignObjectMarkup(),
		attrs: {
			fo: {
				width: 24,
				height: 24,
				x: -12,
				y: (150 - 72 - 24) / 2 - 2
			}
		}
	},
	attrs: {
		line: {
			stroke: 'var(--color_border)'
		}
	}
}

export default {
	nodes: [
		{
			shape: 'Approvaltem',
			id: 'node1',
			x: 0,
			y: 50,
			data: {
				label: '王总',
				type: 'initor'
			}
		},
		{
			shape: 'Approvaltem',
			id: 'node2',
			x: 0,
			y: 200,
			data: {
				label: '张三',
				type: 'approval'
			}
		},
		{
			shape: 'Approvaltem',
			id: 'node3',
			x: 0,
			y: 350,
			data: {
				label: '李四',
				type: 'copy'
			}
		}
	],
	edges: [
		{
			source: 'node1',
			target: 'node2',
			...common_edge_options
		},
		{
			source: 'node2',
			target: 'node3',
			...common_edge_options
		}
	]
} as IPropsApprovalFlowEditor['data']
