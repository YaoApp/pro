import { useDynamicList, useMemoizedFn } from 'ahooks'
import { Input } from 'antd'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical, Plus, Trash } from '@phosphor-icons/react'

import Node from '../Node'

import type { IPropsRow } from '../../types'
import type { InputProps } from 'antd'
import type { DragEndEvent } from '@dnd-kit/core'

const Index = (props: IPropsRow) => {
	const { row, index, sensors, insert, remove, replace, getOnDragEnd } = props
	const { id, title, items } = row
	const { list, getKey, move, insert: _insert, remove: _remove, replace: _replace } = useDynamicList(items)
	const { listeners, setNodeRef, transform, transition } = useSortable({ id })

	useEffect(() => {
		replace(index, { ...row, items: list })
	}, [list])

	const onChangeTitle: InputProps['onChange'] = useMemoizedFn(({ target: { value } }) => {
		replace(index, { ...row, title: value })
	})

	const insertNode = useMemoizedFn(_insert)
	const removeNode = useMemoizedFn(_remove)
	const replaceNode = useMemoizedFn(_replace)

	const onDragEnd = useMemoizedFn((args: DragEndEvent) => getOnDragEnd(list, move)(args))

	return (
		<div
			className='row_item_wrap w_100 border_box'
			{...listeners}
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform), transition }}
		>
			<div className='row_item w_100 h_100 border_box flex flex_column'>
				<div className='header_wrap flex justify_between align_center'>
					<Input
						className='row_title custom_input'
						placeholder='输入标题'
						maxLength={6}
						value={title}
						onChange={onChangeTitle}
					></Input>
					<div className='actions_wrap flex align_center'>
						<div
							className='btn_action flex justify_center align_center'
							onClick={() => remove(index)}
						>
							<Trash size={16}></Trash>
						</div>
						<div
							className='btn_action flex justify_center align_center'
							onClick={() =>
								insert(index + 1, {
									id: nanoid(),
									title: '未设置',
									items: [{ id: nanoid(), title: '未设置' }]
								})
							}
						>
							<Plus size={16}></Plus>
						</div>
						<div className='btn_action btn_move flex justify_center align_center'>
							<DotsSixVertical size={16} weight='bold'></DotsSixVertical>
						</div>
					</div>
				</div>
				<div className='items_wrap w_100 border_box flex flex_wrap'>
					<DndContext sensors={sensors} onDragEnd={onDragEnd}>
						<SortableContext items={list} strategy={verticalListSortingStrategy}>
							{list.map((item, index) => (
								<Node
									id={item.id}
									title={item.title}
									pathname={item.pathname}
									index={index}
									insert={insertNode}
									remove={removeNode}
									replace={replaceNode}
									key={getKey(index)}
								></Node>
							))}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
