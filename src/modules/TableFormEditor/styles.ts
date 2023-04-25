import { makeStyles } from '@/utils/common'

export default makeStyles()({
	local: {
		padding: 12,

		'.table_wrap': {
			width: '100%',
			backgroundColor: 'var(--color_bg_menu)',
			borderCollapse: 'collapse',

			'&.show_detail': {
				width: 'calc(100% - 252px)'
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
					},

					'.tips': {
						color: 'var(--color_text_grey)'
					}
				}
			}
		},

		'.detail_wrap': {
			width: 240,
			backgroundColor: 'var(--color_bg_menu)',
			borderRadius: 'var(--radius)',
			lineHeight: 1,

			'.header_wrap': {
				padding: 12,
				borderBottom: '1px solid var(--color_border_light)',

				'.icon_wrap': {
					width: 24,
					height: 24,
					backgroundColor: 'var(--color_bg_nav)',
					borderRadius: 'var(--radius)',

					'&:hover': {
						backgroundColor: 'var(--color_bg)'
					}
				}
			},

			'.detail_items_wrap': {
				padding: 12,
				paddingBottom: 0,

				'.detail_item_wrap': {
					marginBottom: 12,

					'.form_label': {
						marginBottom: 6,
						color: 'var(--color_title)',
						fontSize: 12
					}
				}
			}
		},

		'.actions_wrap': {
			padding: 12,
			borderBottom: '1px solid var(--color_border_light)',

			'.btn_action': {
				'&.active': {
					outlineOffset: 2,
					outline: '1px solid var(--color_main)'
				}
			},

			'.left_actions': {
				'.btn_action': {
					marginRight: 12
				}
			},

			'.right_actions': {
				'.btn_action': {
					marginLeft: 12
				}
			}
		}
	}
})
