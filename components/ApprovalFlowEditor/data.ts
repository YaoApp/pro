import type { IPropsApprovalFlowEditor } from './types'

export default {
	nodes: [
		{
			shape: 'Approvaltem',
			id: 'node1',
			x: 40,
			y: 40,
			data: {
				label: '王总',
				type: 'initor'
			}
		},
		{
			shape: 'Approvaltem',
			id: 'node2',
			x: 40,
			y: 200,
			data: {
				label: '张三',
				type: 'approval'
			}
		},
		{
			shape: 'Approvaltem',
			id: 'node3',
			x: 40,
			y: 360,
			data: {
				label: '李四',
				type: 'copy'
			}
		}
	],
	edges: [
		{
			source: 'node1',
			target: 'node2'
            },
            {
			source: 'node2',
			target: 'node3'
		}
	]
} as IPropsApprovalFlowEditor['data']
