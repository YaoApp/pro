module.exports = [
	'react',
	'react-dom',
	'react-dom/client',
	'react/jsx-runtime',

	'await-to-js',
	'ts-pattern',
	'axios',
	'emittery',
	'nanoid',
	'classix',
	'tss-react',
	'fast-equals',

	'tsyringe',
	'mobx',
	'mobx-react-lite',

	'@antv/x6',
	'@antv/x6-react-shape',
	'@antv/x6-plugin-scroller',
	'@antv/layout',

	'@dnd-kit/core',
	'@dnd-kit/sortable',
	'@dnd-kit/utilities',

	'antd',
	'ahooks',

	'@yaoapp/storex'
].reduce((total, item) => {
	total[item] = item

	return total
}, {})
