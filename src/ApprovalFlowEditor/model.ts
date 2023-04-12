import Emittery from 'emittery'
import { diff } from 'just-diff'
import { makeAutoObservable, reaction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { match } from 'ts-pattern'
import { injectable } from 'tsyringe'

import { chunkDiff, mergDiff } from '@/common/utils'

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
	current_operation = '' as 'insert' | 'remove' | 'update' | ''

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
		if (!this.current_operation) return

		const flow_data = transform(toJS(v))

		const nodes = this.graph.getNodes()
		const diff_nodes = diff(this.flow_data.nodes, flow_data.nodes)
		const diff_edges = diff(this.flow_data.edges, flow_data.edges)
		const chunk_diff_nodes = chunkDiff(diff_nodes)
		// const chunk_diff_edges = chunkDiff(diff_edges)

		// console.log(diff_nodes, chunk_diff_nodes)
		console.log(diff_edges)

		this.graph.batchUpdate(() => {
			match(this.current_operation)
				.with('insert', () => {
					Object.keys(chunk_diff_nodes).forEach((index) => {
						const diff_items = chunk_diff_nodes[index]
						const target = nodes.at(Number(index))

						if (target) {
							const new_id = diff_items[0].value
							const changed_node = this.graph.updateCellId(target, new_id)

							diff_items.shift()

							changed_node.setData(mergDiff(diff_items))
						} else {
							this.graph.addNode(diff_items[0].value)
						}
					})

					diff_edges.forEach((item) => {
						match(item.op)
							.with('add', () => {
								this.graph.addEdge(item.value)
							})
							.with('replace', () => {
								const target_edge = nodes.at(Number(item.path[0]))!
								const key = item.path[1]

								target_edge.prop(key, item.value)
							})
							.otherwise(() => {})
					})
				})
				.with('remove', () => {})
				.with('update', () => {})
				.otherwise(() => {})
		})

		this.flow_data = flow_data
	}

	private insert(index: number) {
		this.current_operation = 'insert'

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
