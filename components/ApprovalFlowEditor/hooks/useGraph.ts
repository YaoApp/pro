import { useEffect, useRef } from 'react'

import { Graph } from '@antv/x6'

import data from '../data'

export default () => {
	const conatiner = useRef<HTMLDivElement>(null)
	const g = useRef<Graph>()

	useEffect(() => {
		if (!conatiner.current) return

		const graph = new Graph({
			container: conatiner.current,
			height: 600,
			panning: true,
			interacting: { nodeMovable: false }
		})

		graph.fromJSON(data)
		graph.centerContent()

		g.current = graph
	}, [])

	return { conatiner, g }
}
