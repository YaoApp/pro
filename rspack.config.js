const { defineConfig } = require('@rspack/cli')
const { resolve } = require('path')
const externals = require('./build/externals')

module.exports = defineConfig({
	entry: `./src/index.ts`,
	output: {
		// path: resolve(`../xgen-dev-app/public/components/${process.env.NAME}`),
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
