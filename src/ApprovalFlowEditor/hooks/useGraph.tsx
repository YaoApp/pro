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
			mousewheel: true,
			onEdgeLabelRendered: (args) => {
				const { edge, selectors, label } = args
				const { source, target } = edge
				const content = selectors.foContent as HTMLDivElement

				if (content) {
					createRoot(content).render(
						<AddButton
							{...{ namespace, source, target }}
							emitter={x.emitter}
							index={label.data.index}
						/>
					)
				}
			}
		})

		graph.use(new Scroller({ graph, enabled: true, pannable: true }))

		x.graph = graph
		g.current = graph

		const lockScroller = () => {
			graph.lockScroller()
		}
		const unlockScroller = () => {
			graph.unlockScroller()
		}

		x.emitter.on(`${namespace}/afe/lockScroller`, lockScroller)
		x.emitter.on(`${namespace}/afe/unlockScroller`, unlockScroller)

		return () => {
			x.emitter.off(`${namespace}/afe/lockScroller`, lockScroller)
			x.emitter.off(`${namespace}/afe/unlockScroller`, unlockScroller)

			graph.dispose()
		}
	}, [])

	useEffect(() => {
		if (!g.current || mounted) return

		g.current.fromJSON(x.flow_data)
		g.current.positionContent('top')

		if (x.flow_data?.nodes) setMounted(true)
	}, [x.flow_data])

	return { x, c }
}
