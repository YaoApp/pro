import { useMemoizedFn } from 'ahooks'
import { Input } from 'antd'
import { nanoid } from 'nanoid'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical, Plus, Trash } from '@phosphor-icons/react'

import type { IPropsNode } from '../../types'
import type { InputProps } from 'antd'

const Index = (props: IPropsNode) => {
	const { id, title, pathname, index, insert, remove, replace } = props
	const { listeners, setNodeRef, transform, transition } = useSortable({ id })

	const onChangeTitle: InputProps['onChange'] = useMemoizedFn(({ target: { value } }) => {
		replace(index, { id, pathname, title: value })
	})

	const onChangePathname: InputProps['onChange'] = useMemoizedFn(({ target: { value } }) => {
		replace(index, { id, title, pathname: value })
	})

	return (
		<div
			className='item_wrap w_100 border_box flex align_center'
			{...listeners}
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform), transition }}
		>
			<div className='left_input_wrap h_100 border_box flex justify_between'>
				<Input
					className='input_item_title custom_input'
					placeholder='输入标题'
					maxLength={6}
					value={title}
					onChange={onChangeTitle}
				></Input>
				<Input
					className='input_item_pathname custom_input text_right'
					placeholder='输入跳转路径'
					maxLength={30}
					value={pathname}
					onChange={onChangePathname}
				></Input>
			</div>
			<div className='actions_wrap flex align_center'>
				<div className='btn_action flex justify_center align_center' onClick={() => remove(index)}>
					<Trash size={16}></Trash>
				</div>
				<div
					className='btn_action flex justify_center align_center'
					onClick={() => insert(index + 1, { id: nanoid(), title: '未设置', pathname: '' })}
				>
					<Plus size={16}></Plus>
				</div>
				<div className='btn_action btn_move flex justify_center align_center'>
					<DotsSixVertical size={16} weight='bold'></DotsSixVertical>
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
