import { makeStyles } from '@/components/common'

const header_height = '24px'
const detail_height = `calc(100% - ${header_height})`
const padding = '0 12px'

export default makeStyles()((_theme, _params, classes) => ({
	local: {
		width: 210,
		height: 72,
		backgroundColor: 'var(--color_bg_menu)',
		borderRadius: 'var(--radius)',
		overflow: 'hidden',
		outline: '1px solid transparent',

		'&:hover': {
			outline: '1px solid var(--color_text)'
		}
	},
	header_wrap: {
		height: header_height,
		padding,
		fontSize: 12,
		color: 'white',

		'&.initor': { backgroundColor: 'var(--color_main)' },
		'&.approval': { backgroundColor: 'var(--color_warning)' },
		'&.copy': { backgroundColor: 'var(--color_bg)', color: 'unset' }
	},
	detail_wrap: {
		height: detail_height,
		padding
	}
}))
