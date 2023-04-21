import { makeStyles } from '@/utils/common'

export default makeStyles()({
	local: {
		padding: 12,

		'.table_wrap': {
			width: '100%',
			backgroundColor: 'var(--color_bg_menu)',
			borderCollapse: 'collapse',

			'&.show_detail': {
				width: 'calc(100% - 256px)'
			},

			'.label': {
				marginRight: 12,
				fontWeight: '400 !important',
				color: 'var(--color_title_grey) !important'
			},

			'.xgen-input': {
				padding: 0,
				boxShadow: 'none',
				backgroundColor: 'transparent'
			},

			tr: {
				borderBottom: '1px solid var(--color_border_light)',
				borderRight: '1px solid var(--color_border_light)',

				'&:first-of-type': {
					borderTop: '1px solid var(--color_border_light)'
				},

				td: {
					height: 40,
					padding: '0 12px',
					borderLeft: '1px solid var(--color_border_light)',

					'&:hover,&.active': {
						border: '1px solid var(--color_main)'
					}
				}
			}
		},

		'.detail_wrap': {
			width: 240,
			padding: 12,
			backgroundColor: 'var(--color_bg_menu)',
			borderRadius: 'var(--radius)',
			lineHeight: 1
		}
	}
})
