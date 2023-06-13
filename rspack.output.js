const { defineConfig } = require('@rspack/cli')
const { resolve } = require('path')
const externals = require('./build/externals')

const is_prod = process.env.MODE === 'prod'

const modules = ['ApprovalFlowEditor', 'ProjectFlowEditor', 'TableFormEditor']

module.exports = defineConfig({
	entry: modules.reduce((total, item) => {
		total[item] = `./src/modules/${item}/index.tsx`

		return total
	}, {}),
	output: {
		clean: is_prod,
		filename: '[name].js',
		library: {
			type: 'umd'
		}
	},
	resolve: {
		alias: {
			'@': resolve(`${process.cwd()}/src`)
		}
	},
	devtool: false,
	externals,
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
