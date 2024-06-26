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
					marginBottom: 3,

					'&:last-child': {
						marginBottom: 0
					},

					'.custom_input': {
						fontSize: 13
					},

					'.left_input_wrap': {
						height: '30px',
						width: 'calc(100% - 120px - 12px)',
						backgroundColor: 'var(--color_bg_nav)',
						borderRadius: 'var(--radius)',

						'.input_item_title': {
							width: '100px',
							padding: '0 9px'
						},

						'.input_item_pathname': {
							width: 'calc(100% - 100px)'
						}
					},

					'.select_form': {
						width: 'calc(100% - 100px)',

						'.xgen-select-selector': {
							height: '30px',

							'.xgen-select-selection-placeholder': {
								height: '30px',
								lineHeight: '30px',
							},
							'.xgen-select-selection-item': {
								lineHeight: '30px'
							}
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
					},

					'.desc_wrap': {
                                    fontSize: '12px'
					}
				}
			}
		}
	}
})
