import Emittery from 'emittery'
import { diff } from 'just-diff'
import { makeAutoObservable, reaction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { injectable } from 'tsyringe'

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

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })

		this.reactions()
	}

	init(namespace: string) {
		this.namespace = namespace

		this.on()
	}

	private reactions() {
		reaction(
			() => this.raw_data,
			(v) => {
				if (this.flow_data.nodes) {
					this.getDiffData(v)
				} else {
					this.getFlowData(v)
				}
			}
		)
	}

	private getFlowData(v: AFE.RawData) {
		this.flow_data = transform(v)
	}

	private getDiffData(v: AFE.RawData) {
		const flow_data = transform(toJS(v))

		const diff_nodes = diff(this.flow_data.nodes, flow_data.nodes)
		const diff_edges = diff(this.flow_data.edges, flow_data.edges)

		console.log(toJS(this.flow_data.nodes), toJS(flow_data.nodes))

		console.log(diff_nodes)
		console.log(diff_edges)
	}

	private insert(index: number) {
		this.raw_data.splice(index + 1, 0, {
			id: nanoid(),
			uid: -1,
			label: '',
			type: 'approval'
		})

		this.raw_data = toJS(this.raw_data)
	}

	private remove(index: number) {}

	on() {
		this.emitter.on(`${this.namespace}/afe/insert`, this.insert)
		this.emitter.on(`${this.namespace}/afe/remove`, this.remove)
	}

	off() {
		this.emitter.off(`${this.namespace}/afe/insert`, this.insert)
		this.emitter.off(`${this.namespace}/afe/remove`, this.remove)
	}
}
