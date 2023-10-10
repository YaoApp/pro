import { useDynamicList, useMemoizedFn, useAsyncEffect } from 'ahooks'
import to from 'await-to-js'
import { cx } from 'classix'
import { debounce } from 'lodash-es'
import { nanoid } from 'nanoid'
import { useLayoutEffect, useState, useEffect } from 'react'

import { EditWrapper } from '@/components'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import { Row } from './components'
import useStyles from './styles'

import type { IEditWrapper } from '@/components'
import type { IPropsProjectFlowEditor } from './types'
import type { DragEndEvent } from '@dnd-kit/core'
import type { SelectProps } from 'antd'

const preset_data = [{ id: nanoid(), title: '未设置', items: [{ id: nanoid(), title: '未设置' }] }]

const Index = (props: IPropsProjectFlowEditor) => {
	const { formsApi, value } = props
	const { classes } = useStyles()
	const [form_options, setFormOptions] = useState<SelectProps['options']>([])
	const [loaded, setLoaded] = useState(false)
	const data = value?.length ? value : preset_data
	const {
		list,
		resetList,
		getKey,
		move,
		insert: _insert,
		remove: _remove,
		replace: _replace
	} = useDynamicList(data)
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

	useLayoutEffect(() => {
		if (!value) return
		if (loaded) return

		resetList(value?.length ? value : preset_data)

		setLoaded(true)
	}, [value])

	useEffect(() => {
		props.onChange(list)
	}, [list])

	useAsyncEffect(async () => {
		const [err, res] = await to<SelectProps['options']>(window.$axios.get(formsApi))

		if (err) return

		setFormOptions(res)
	}, [formsApi])

	const insert = useMemoizedFn(_insert)
	const remove = useMemoizedFn(_remove)
	const replace = useMemoizedFn(debounce(_replace, 450))

	const getOnDragEnd = useMemoizedFn(
		(_list: Array<any>, _move: (oldIndex: number, newIndex: number) => void) =>
			({ active, over }: DragEndEvent) => {
				if (!over) return

				const active_index = _list.findIndex((item) => item.id === active.id)
				const over_index = _list.findIndex((item) => item.id === over.id)

				_move(active_index, over_index)
			}
	)

	const onDragEnd = useMemoizedFn((args: DragEndEvent) => getOnDragEnd(list, move)(args))

	return (
		<div className={cx('w_100 border_box flex flex_wrap', classes.local)}>
			<DndContext sensors={sensors} onDragEnd={onDragEnd}>
				<SortableContext items={list} strategy={rectSortingStrategy}>
					{list.map((item, index) => (
						<Row
							form_options={form_options}
							row={item}
							{...{ index, sensors, insert, remove, replace, getOnDragEnd }}
							key={getKey(index)}
						></Row>
					))}
				</SortableContext>
			</DndContext>
		</div>
	)
}

export default window.$app.memo((props: IEditWrapper) => EditWrapper(Index, props)())
