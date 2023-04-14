import { makeStyles } from '@/utils/common'

export default makeStyles()({
	local: {
		width: 240
	},
	content: {
		backgroundColor: 'var(--color_bg_nav)',
		borderRadius: 'var(--radius)',

		'.title_wrap': {
                  padding: 12,
                  borderBottom:'1px solid var(--color_border_light)'
		}
	},
	detail: {
		padding: 12,

		'.xgen-select-selector': {
			backgroundColor: 'var(--color_bg_menu) !important'
		}
	}
})
