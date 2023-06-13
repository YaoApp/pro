import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { container } from 'tsyringe'

import { Graph } from '@antv/x6'
import { Scroller } from '@antv/x6-plugin-scroller'

import { AddButton } from '../components'
import Model from '../model'

export default (namespace: string) => {
	const [x] = useState(() => container.resolve(Model))

	const c = useRef<HTMLDivElement>(null)
	const g = useRef<Graph>()
	const [mounted, setMounted] = useState(false)

	useLayoutEffect(() => {
		if (!c.current) return

		const graph = new Graph({
			container: c.current,
			height: 600,
			autoResize: true,
			interacting: false,
			onEdgeLabelRendered: (args) => {
				const { edge, selectors } = args
				const { source, target } = edge
				const content = selectors.foContent as HTMLDivElement

				if (content) {
					createRoot(content).render(<AddButton {...{ namespace, source, target }} id={edge.id} />)
				}
			}
		})

		graph.use(new Scroller({ graph, enabled: true, pannable: true, autoResize: true }))

		x.graph = graph
		g.current = graph

		const lockScroller = () => {
			graph.lockScroller()
		}
		const unlockScroller = () => {
			graph.unlockScroller()
		}

		window.$app.Event.on(`${namespace}/afe/lockScroller`, lockScroller)
		window.$app.Event.on(`${namespace}/afe/unlockScroller`, unlockScroller)

		return () => {
			window.$app.Event.off(`${namespace}/afe/lockScroller`, lockScroller)
			window.$app.Event.off(`${namespace}/afe/unlockScroller`, unlockScroller)

			graph.dispose()
		}
	}, [])

	useEffect(() => {
		if (!g.current || mounted) return

		g.current.fromJSON(x.flow_data)
		g.current.positionContent('top', { padding: { top: 50 } })

		if (x.flow_data?.nodes) setMounted(true)
	}, [x.flow_data])

	return { x, c }
}
