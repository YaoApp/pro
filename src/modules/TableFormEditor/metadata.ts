export default {
	common: {
		type: {
			type: 'select',
			label: '字段类型',
			options: [
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
				},
				{
					type: 'TextArea',
					label: '文本段落'
				},
				{
					type: 'RichText',
					label: '富文本'
				}
			]
		},
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
			props_maxLength: {
				type: 'number',
				label: '长度限制'
			}
		},
		Input: {
			props_maxLength: {
				type: 'number',
				label: '长度限制'
			}
		},
		Checkbox: {
			props_options: {
				type: 'Array<string>',
				label: '可选项'
			}
		},
		Radio: {
			props_options: {
				type: 'Array<string>',
				label: '可选项'
			}
		},
            TextArea: {
                  value: {
                        type: 'textarea',
                        label: '默认值'
                  },
			props_maxLength: {
				type: 'number',
				label: '长度限制'
			}
		},
		RichText: {
			value: {
				type: 'richtext',
				label: '富文本内容'
			}
		}
	},
	action: {
		common: {
			type: {
				type: 'select',
				label: '按钮类型',
				options: [
					{
						type: 'api',
						label: '接口'
					},
					{
						type: 'info',
						label: '提示'
					}
				]
			},
			text: {
				type: 'string',
				label: '按钮文字'
			}
		},
		api: {
			api: {
				type: 'string',
				label: '调用的接口'
			},
			isPrimary: {
				type: 'boolean',
				label: '是否为主题色按钮'
			}
		},
		info: {
			info: {
				type: 'richtext',
				label: '帮助信息'
			}
		}
	}
}
