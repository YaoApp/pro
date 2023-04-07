import { defineConfig } from 'rollup'
import { minify, swc } from 'rollup-plugin-swc3'

import { ApprovalFlowEditor, plugins, ProjectFlowEditor } from './rollup.common'

const common_config = defineConfig({
	plugins: [...plugins, swc(), minify()]
})

export default defineConfig([
	{ ...ApprovalFlowEditor, ...common_config },
	{ ...ProjectFlowEditor, ...common_config }
])
