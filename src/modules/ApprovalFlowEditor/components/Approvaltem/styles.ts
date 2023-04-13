import { makeStyles } from '@/utils/common'

const header_height = '24px'
const detail_height = `calc(100% - ${header_height})`

export default makeStyles()((_theme, _args, classes: any) => ({
	local: {
		width: 210,
		height: 72,
		backgroundColor: 'var(--color_bg_menu)',
		borderRadius: 'var(--radius)',
		overflow: 'hidden',
		boxShadow: 'var(--shadow)',
		border: '1px solid transparent',

		'&:hover': {
			border: '1px solid var(--color_text)',

			[`.${classes.header_wrap}`]: {
				'.icon_remove_wrap': {
					display: 'flex'
				}
			}
		}
	},
	header_wrap: {
		height: header_height,
		paddingLeft: 10,
		paddingRight: 3,
		fontSize: 12,
		color: 'white',

		'&.initor': { backgroundColor: 'var(--color_main)' },
		'&.approval': { backgroundColor: 'var(--color_warning)' },
		'&.copy': { backgroundColor: 'var(--color_bg)', color: 'unset' },

		'.icon_remove_wrap': {
			width: 16,
			height: 16,
			padding: 2,
			borderRadius: '50%',
			border: '1px solid transparent',

			'&:hover': {
				borderColor: 'var(--color_border)'
			}
		}
	},
	detail_wrap: {
		height: detail_height,
		padding: '0 12px'
	}
}))
