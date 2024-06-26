import { Markup } from '@antv/x6'

export const getEdgeOptions = () => ({
	shape: 'edge',
	label: { position: 0 },
	defaultLabel: {
		markup: Markup.getForeignObjectMarkup(),
		attrs: {
			fo: {
				width: 24,
				height: 24,
				x: -12,
				y: (150 - 72 - 24) / 2 - 2
			}
		}
	},
	attrs: {
		line: {
			stroke: 'var(--color_border)'
		}
	}
})
