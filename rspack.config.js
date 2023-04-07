const { defineConfig } = require('@rspack/cli')
const { resolve } = require('path')

module.exports = defineConfig({
	entry: `./components/${process.env.NAME}/index.tsx`,
	output: {
		path: resolve(`../xgen-dev-app/public/components/${process.env.NAME}`),
		filename: 'index.js',
		library: {
			type: 'amd'
		}
	},
	resolve: {
		alias: {
			'@': resolve(process.cwd())
		}
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		'react-dom/client': 'react-dom/client',
		'react/jsx-runtime': 'react/jsx-runtime',
		antd: 'antd',
		tsyringe: 'tsyringe',
		mobx: 'mobx',
		'mobx-react-lite': 'mobx-react-lite',
		'fast-equals': 'fast-equals',
		'@antv/x6': '@antv/x6',
		'@antv/x6-react-shape': '@antv/x6-react-shape',
		'tss-react': 'tss-react'
	},
	watchOptions: {
		ignored: /node_modules/
	},
	experiments: {
		incrementalRebuild: true
	},
	builtins: {
		emotion: true,
		decorator: {}
	}
})
