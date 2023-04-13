import Emittery from 'emittery'
import { makeAutoObservable, reaction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { injectable } from 'tsyringe'

import { graphUpdater, removeBy } from '@/utils'

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
				if (this.flow_data.nodes) {
					this.updateFlow(v)
				} else {
					this.getFlow(v)
				}
			}
		)
	}

	private transform(v: AFE.RawData) {
		return transform(this.namespace, v)
	}

      private getFlow(v: AFE.RawData) {
		this.flow_data = this.transform(v)
	}

	private updateFlow(v: AFE.RawData) {
		const flow_data = this.transform(toJS(v))

		graphUpdater({
			graph: this.graph,
			prev_flow: toJS(this.flow_data),
			current_flow: flow_data
		})

		this.flow_data = flow_data
	}

	private insert(id: string) {
		const edge = this.graph.getEdges().find((item) => item.id === id)!
		const index = this.raw_data.findIndex((item) => item.id === edge.getSourceCellId())

		this.raw_data.splice(index + 1, 0, {
			id: nanoid(),
			uid: -1,
			label: '未设置',
			type: 'approval'
		})

		this.raw_data = toJS(this.raw_data)
	}

	private remove(id: string) {
		removeBy(this.raw_data, 'id', id)

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
