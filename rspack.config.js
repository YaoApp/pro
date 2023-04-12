const { defineConfig } = require('@rspack/cli')
const { resolve } = require('path')
const externals = require('./build/externals')

const is_prod = process.env.MODE === 'prod'

module.exports = defineConfig({
	entry: `./src/index.ts`,
	output: {
		clean: is_prod,
		filename: 'index.js',
		library: {
			type: 'amd'
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
