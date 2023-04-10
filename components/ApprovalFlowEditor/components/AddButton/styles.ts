import { makeStyles } from '@/components/common'

export default makeStyles()({
	local: {
		backgroundColor: 'var(--color_main)',
		borderRadius: '50%'
	},
	options: {
		width: 150,
		padding: '4px 0',
		lineHeight: 1,

		'.options_title': {
			marginBottom: 12,
			fontWeight: 500
		},

		'.option_item': {
			padding: 12,
			borderRadius: 'var(--radius)',
			border: '1px solid var(--color_border_light)',

			'&:hover': {
				borderColor: 'var(--color_text)'
			},

			'.icon_wrap': {
				width: 36,
				height: 36,
				borderRadius: '50%',
				marginRight: 9,
				color: 'white',
				backgroundColor: 'var(--color_warning)'
			}
		}
	}
})
