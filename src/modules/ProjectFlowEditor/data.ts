import { nanoid } from 'nanoid'

import type { IPropsProjectFlowEditor } from './types'

export default [
	{
		id: nanoid(),
		title: '项目启动',
		items: [
			{
				id: nanoid(),
				title: '系统立项',
				pathname: '/form/start'
			},
			{
				id: nanoid(),
				title: '团队组建',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '启动会议',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '项目计划',
				pathname: ''
			}
		]
	},
	{
		id: nanoid(),
		title: '项目进行',
		items: [
			{
				id: nanoid(),
				title: '第一步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第二步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第三步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第四步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第五步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第六步',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '第七步',
				pathname: ''
			}
		]
	},
	{
		id: nanoid(),
		title: '项目跟踪',
		items: [
			{
				id: nanoid(),
				title: '数据清单',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '施工图记录',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '现场服务计划',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '设计变更记录',
				pathname: ''
			},
			{
				id: nanoid(),
				title: '项目回访',
				pathname: ''
			}
		]
	}
] as IPropsProjectFlowEditor['value']
