import { makeAutoObservable, reaction, toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { injectable } from 'tsyringe'

import { graphUpdater, removeBy } from '@/utils'

import Services from './services'
import { transform } from './utils'

import type { Graph } from '@antv/x6'
import type { AFE, Options } from './types'
import type { IEditComponent } from '@/components'

@injectable()
export default class Index {
	graph = {} as Graph
	namespace = ''
	options = {} as Options
	raw_data = [] as AFE.RawData
	flow_data = {} as AFE.FlowData
	visible_detail = false
	current_item = {} as AFE.RawDataItem
	onChange = null as IEditComponent['onChange'] | null

	constructor(public services: Services) {
		makeAutoObservable(this, {}, { autoBind: true })
	}

      init(namespace: string, api: string, options: Options, onChange: IEditComponent[ 'onChange' ]) {
		window[`${namespace}_AFE`] = {
			emitter: window.$app.Event
		}

		this.namespace = namespace
		this.options = options
		this.onChange = onChange

		this.reactions()
		this.on()

		this.services.init(api)
	}

	private reactions() {
		reaction(
			() => this.raw_data,
			(v) => {
				this.onChange?.(toJS(v))

				if (this.flow_data.nodes) {
					this.updateFlow(v)
				} else {
					this.getFlow(v)
				}
			}
		)
	}

	private transform(v: AFE.RawData) {
		return transform(this.namespace, v, this.options)
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

	private setCurrentItem(id: string) {
		const item = this.raw_data.find((item) => item.id === id)!

		this.current_item = item
		this.visible_detail = true
	}

	private updateCurrentItem({ uid, label }: { uid: number; label: string }) {
		const index = this.raw_data.findIndex((item) => item.id === this.current_item.id)!

		this.raw_data[index].uid = uid
		this.raw_data[index].label = label

		this.raw_data = toJS(this.raw_data)
	}

	on() {
		window.$app.Event.on(`${this.namespace}/afe/insert`, this.insert)
		window.$app.Event.on(`${this.namespace}/afe/remove`, this.remove)
		window.$app.Event.on(`${this.namespace}/afe/setCurrentItem`, this.setCurrentItem)
		window.$app.Event.on(`${this.namespace}/afe/updateCurrentItem`, this.updateCurrentItem)
	}

	off() {
		window.$app.Event.off(`${this.namespace}/afe/insert`, this.insert)
		window.$app.Event.off(`${this.namespace}/afe/remove`, this.remove)
		window.$app.Event.off(`${this.namespace}/afe/setCurrentItem`, this.setCurrentItem)
		window.$app.Event.off(`${this.namespace}/afe/updateCurrentItem`, this.updateCurrentItem)
	}
}
