import PostCssImport from 'postcss-import'
import PostCssNested from 'postcss-nested'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export const plugins = [
	nodeResolve(),
	commonjs({ requireReturnsDefault: 'auto' }),
	postcss({
		extract: false,
		modules: true,
		plugins: [PostCssImport(), PostCssNested()]
	})
]

const getConfig = (name: string) => {
	return defineConfig({
		output: {
			dir: `../xgen-dev-app/public/components/${name}`,
			format: 'systemjs'
		},
		external: [
			'react',
			'react-dom',
			'react-dom/client',
			'react/jsx-runtime',
			'antd',
			'tsyringe',
			'mobx',
			'mobx-react-lite',
			'fast-equals'
		],
		maxParallelFileOps: 96,

		// When using tsyringe, this item needs to be set
		context: 'false'
	})
}

export const ApprovalFlowEditor = defineConfig({
	input: 'components/ApprovalFlowEditor/index.tsx',
	...getConfig('ApprovalFlowEditor')
})

export const ProjectFlowEditor = defineConfig({
	input: 'components/ProjectFlowEditor/index.ts',
	...getConfig('ProjectFlowEditor')
})
