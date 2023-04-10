module.exports = [
	'react',
	'react-dom',
	'react-dom/client',
	'react/jsx-runtime',

	'axios',
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
      
	'antd',
	'ahooks'
].reduce((total, item) => {
	total[item] = item

	return total
}, {})
