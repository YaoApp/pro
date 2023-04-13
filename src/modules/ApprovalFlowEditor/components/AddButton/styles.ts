import { makeStyles } from '@/utils/common'

export default makeStyles()({
	local: {
		backgroundColor: 'var(--color_main)',
		borderRadius: '50%'
	},
	popover: {
		'.xgen-popover-inner-content': {
			padding: 12
		}
	},
	options: {
		width: 150,
		lineHeight: 1,

		'.options_title': {
			marginBottom: 12,
			fontWeight: 500,
			fontSize: 13
		},

		'.option_item': {
			padding: 8,
			borderRadius: 'var(--radius)',
			backgroundColor: 'var(--color_bg_nav)',

			'&:hover': {
				backgroundColor: 'var(--color_bg)',
			},

			'.icon_wrap': {
				width: 30,
				height: 30,
				borderRadius: '50%',
				marginRight: 9,
				color: 'var(--color_warning)',
				border: '1px solid var(--color_border_light)'
			}
		}
	}
})
