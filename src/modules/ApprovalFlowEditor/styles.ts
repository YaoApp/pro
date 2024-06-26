import { makeStyles } from '@/utils/common'

export default makeStyles()({
	graph: {
		width: '100%',
		backgroundColor: 'var(--color_bg_nav)',
		borderRadius: 'var(--radius)'
	},
	show_detail: {
		width: 'calc(100% - 252px)',

		'.__graph_container': {
			transform: 'translate(-126px)'
		}
	}
})
