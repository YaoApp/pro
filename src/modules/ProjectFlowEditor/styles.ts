import { makeStyles } from '@/utils/common'

export default makeStyles()({
	local: {
		padding: 6,

		'.row_item_wrap': {
			width: 'calc(100% / 3)',
			minHeight: 228,
			padding: 6,

			'.row_item': {
				padding: 12,
				backgroundColor: 'var(--color_bg_menu)',
				borderRadius: 'var(--radius)',

				'.custom_input': {
					backgroundColor: 'transparent',
					padding: 0,
					borderRadius: 0,
					lineHeight: 1,
					boxShadow: 'none'
				},

				'.actions_wrap': {
					marginRight: -3,

					'.btn_action': {
						width: 24,
						height: 24,
						borderRadius: 'var(--radius)',

						'&:hover': {
							backgroundColor: 'var(--color_bg_nav)'
						},

						'&.btn_move': {
							cursor: 'move'
						}
					}
				},

				'.header_wrap': {
					marginBottom: 9,

					'.row_title': {
						width: 'calc(100% - 60px)'
					}
				},

				'.item_wrap': {
					height: 30,
					marginBottom: 3,

					'&:last-child': {
						marginBottom: 0
					},

					'.custom_input': {
						fontSize: 13
					},

					'.left_input_wrap': {
						width: 'calc(100% - 90px - 9px)',
						padding: '0 9px',
						backgroundColor: 'var(--color_bg_nav)',
						borderRadius: 'var(--radius)',

						'.input_item_title': {
							width: 80
						},

						'.input_item_pathname': {
							width: 'calc(100% - 100px)'
						}
					},

					'.actions_wrap': {
						marginRight: 0,

						'.btn_action': {
							width: 30,
							height: 30,
							marginLeft: 3,
							backgroundColor: 'var(--color_bg_nav)'
						}
					}
				}
			}
		}
	}
})
