export default [
	[
		{
			type: 'Title',
			label: '奥雅项目信息表',
			colSpan: 4
		}
	],
	[
		{
			type: 'Title',
			label: '项目情况',
			rowSpan: 5
		},
		{
			type: 'Input',
			label: '项目名称',
			value: '泥巴沱体育公园',
			colSpan: 3
		}
	],
	[
		{
			type: 'Input',
			label: '项目编号',
			value: 'H239129319239'
		},
		{
			type: 'Input',
			label: '项目地点',
			value: '成都市新都区育英大桥东',
			colSpan: 2
		}
	],
	[
		{
			type: 'Input',
			label: '项目风格',
			value: '中式风格'
		},
		{
			type: 'Input',
			label: '项目造价',
			value: '3000万'
		},
		{
			type: 'Input',
			label: '项目规模',
			value: '200000平'
		}
	],
	[
		{
			type: 'Checkbox',
			label: '项目规模',
			value: null,
			colSpan: 3,
			props: {
				options: [
					{ label: 'Apple', value: 'Apple' },
					{ label: 'Pear', value: 'Pear' },
					{ label: 'Orange', value: 'Orange' }
				]
			}
		}
	],
	[
		{
			type: 'Radio',
			label: '项目工作类型',
			value: null,
			colSpan: 3,
			props: {
				options: [
					{ label: 'Apple', value: 'Apple' },
					{ label: 'Pear', value: 'Pear' },
					{ label: 'Orange', value: 'Orange' }
				]
			}
		}
	]
] as const
