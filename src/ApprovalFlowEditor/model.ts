import Emittery from 'emittery'
import { diff } from 'just-diff'
import { makeAutoObservable, reaction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { injectable } from 'tsyringe'

import { handleDiffNodes } from '@/common/utils'

import { transform } from './utils'

import type { Graph } from '@antv/x6'
import type { AFE } from './types'

@injectable()
export default class Index {
	emitter = new Emittery()
	graph = {} as Graph
	namespace = ''
	raw_data = [] as AFE.RawData
	flow_data = {} as AFE.FlowData
	current_operation = '' as 'insert' | 'remove' | 'update'

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	init(namespace: string) {
		window[`${namespace}_AFE`] = {
			emitter: this.emitter
		}

		this.namespace = namespace

		this.on()
		this.reactions()
	}

	private reactions() {
		reaction(
			() => this.raw_data,
			(v) => {
				// this.getFlowData(v)

				if (this.flow_data.nodes) {
					this.getDiffData(v)
				} else {
					this.getFlowData(v)
				}
			}
		)
	}

	private transform(v: AFE.RawData) {
		return transform(this.namespace, v)
	}

	private getFlowData(v: AFE.RawData) {
		this.flow_data = this.transform(v)
	}

	private getDiffData(v: AFE.RawData) {
		if (!this.current_operation) return

		const flow_data = this.transform(v)
		const diff_nodes = diff(this.flow_data.nodes, flow_data.nodes)
		const diff_edges = diff(this.flow_data.edges, flow_data.edges)

		this.graph.batchUpdate(() => {
			handleDiffNodes({
				graph: this.graph,
				diff_nodes,
				diff_edges,
				operation: this.current_operation,
				flow_data_nodes: toJS(this.flow_data.nodes)
			})
		})

		this.flow_data = flow_data
	}

	private insert(id: string) {
		this.current_operation = 'insert'

		const index = this.graph.getEdges().findIndex((item) => item.id === id)

		this.raw_data.splice(index + 1, 0, {
			id: nanoid(),
			uid: -1,
			label: '',
			type: 'approval'
		})

		this.raw_data = toJS(this.raw_data)
	}

	private remove(id: string) {
		this.current_operation = 'remove'

		const index = this.raw_data.findIndex((item) => item.id === id)

		this.raw_data.splice(index, 1)

		this.raw_data = toJS(this.raw_data)
	}

	on() {
		this.emitter.on(`${this.namespace}/afe/insert`, this.insert)
		this.emitter.on(`${this.namespace}/afe/remove`, this.remove)
	}

	off() {
		this.emitter.off(`${this.namespace}/afe/insert`, this.insert)
		this.emitter.off(`${this.namespace}/afe/remove`, this.remove)
	}
}
