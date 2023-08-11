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

					span: {
						whiteSpace: 'nowrap'
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
		},

		'.richtext_wrap': {
			borderRadius: 'var(--radius)',
			padding: '6px 12px',

			'&.has_height': {
				backgroundColor: 'var(--color_bg_nav)',

				'.codex-editor': {
					'.codex-editor__redactor': {
						height: 360,
						overflow: 'scroll'
					}
				}
			},

			'.codex-editor': {
				fontSize: 12,

				'.codex-editor__redactor': {
					paddingBottom: '0px !important',
					marginLeft: 0,
					marginRight: 0,

					'.ce-block__content': {
						maxWidth: '100%'
					}
				},

				'.ce-paragraph[data-placeholder]:empty::before': {
					color: 'rgba(var(--color_text_rgb), 0.3)'
				},

				'.ce-toolbar': {
					'&__actions': {
						left: '-48px',
						right: 'unset'
					},

					'&__plus': {
						width: 18,
						height: 18,
						borderRadius: 3,
						paddingRight: 0
					},

					'&__settings-btn': {
						width: 18,
						height: 18,
						borderRadius: 3,
						marginLeft: 0
					},

					'.ce-popover': {
						zIndex: 1000
					}
				},

				'.image-tool__image-picture': {
					borderRadius: 6
				},

				'.image-tool__caption': {
					padding: 0,
					border: 'none',
					boxShadow: 'none',
					textAlign: 'center',

					'&::before': {
						width: '100%',
						textAlign: 'center'
					}
				}
			}
		}
	}
})
