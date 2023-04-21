export default {
	common: {
		type: [
			{
				type: 'Title',
				label: '标题'
			},
			{
				type: 'Input',
				label: '输入框'
			},
			{
				type: 'Checkbox',
				label: '多选'
			},
			{
				type: 'Radio',
				label: '单选'
			}
		],
		label: {
			type: 'string',
			label: '字段描述'
		},
		value: {
			type: 'any',
			label: '默认值'
		},
		prefix: {
			type: 'string',
			label: '前缀'
		},
		suffix: {
			type: 'string',
			label: '后缀'
		},
		tips: {
			type: 'string',
			label: '提示'
		},
		rowSpan: {
			type: 'number',
			label: '跨行数'
		},
		colSpan: {
			type: 'number',
			label: '跨列数'
		}
	},
	components: {
		Title: {
			maxLength: {
				type: 'number',
				label: '长度限制'
			}
		},
		Input: {
			maxLength: {
				type: 'number',
				label: '长度限制'
			}
		},
		Checkbox: {
			options: {
				type: 'Array<string>',
				label: '可选项'
			}
		},
		Radio: {
			options: {
				type: 'Array<string>',
				label: '可选项'
			}
		}
	},
	action: {
		text: {
			type: 'string',
			label: '按钮文字'
		},
		bgColor: {
			type: 'string',
			label: '按钮背景色'
		},
		textColor: {
			type: 'string',
			label: '按钮文字颜色'
		},
		api: {
			type: 'string',
			label: '调用的接口'
		},
		afterClose: {
			type: 'boolean',
			label: '执行后关闭弹窗'
		}
	}
}
