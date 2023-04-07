import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

import { Graph } from '@antv/x6'

import { Button } from '../components'
import data from '../data'

export default () => {
	const conatiner = useRef<HTMLDivElement>(null)
	const g = useRef<Graph>()

	console.log('123')

	useEffect(() => {
		if (!conatiner.current) return

		const graph = new Graph({
			container: conatiner.current,
			height: 600,
			panning: true,
			autoResize: true,
			interacting: { nodeMovable: false },
			onEdgeLabelRendered: (args) => {
				const { selectors } = args
				const content = selectors.foContent as HTMLDivElement

				if (content) createRoot(content).render(<Button></Button>)
			}
		})

		graph.fromJSON(data)
		graph.centerContent()

		g.current = graph
	}, [])

	return { conatiner, g }
}
