import { useMemoizedFn } from 'ahooks'
import { Input, Select } from 'antd'
import { nanoid } from 'nanoid'
import { useState } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical, Plus, Trash, Info } from '@phosphor-icons/react'

import type { IPropsNode } from '../../types'
import type { InputProps, SelectProps } from 'antd'

const { TextArea } = Input

const Index = (props: IPropsNode) => {
	const { form_options, id, title, pathname, desc, index, insert, remove, replace } = props
	const { listeners, setNodeRef, transform, transition } = useSortable({ id })
	const [visible_desc, setVisibleDesc] = useState(false)

	const onChangeTitle: InputProps['onChange'] = useMemoizedFn(({ target: { value } }) => {
		replace(index, { id, pathname, desc, title: value })
	})

	const onChangePathname: SelectProps['onSelect'] = useMemoizedFn((value) => {
		replace(index, { id, title, desc, pathname: value })
	})

      const onChangeDesc: InputProps[ 'onChange' ] = useMemoizedFn(({ target: { value } }) => {
		replace(index, { id, title, pathname, desc: value })
	})

	return (
		<div
			className='item_wrap w_100 border_box flex flex_column align_center'
			{...listeners}
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform), transition }}
		>
			<div className='w_100 flex'>
				<div className='left_input_wrap h_100 border_box flex justify_between'>
					<Input
						className='input_item_title custom_input'
						placeholder='输入节点名称'
						maxLength={6}
						value={title}
						onChange={onChangeTitle}
					></Input>
					<Select
						className='select_form'
						placeholder='选择表单'
						bordered={false}
						options={form_options}
						value={pathname}
						onSelect={onChangePathname}
					></Select>
				</div>
				<div className='actions_wrap flex align_center'>
					<div
						className='btn_action flex justify_center align_center'
						onClick={() => setVisibleDesc(!visible_desc)}
					>
						<Info size={16}></Info>
					</div>
					<div
						className='btn_action flex justify_center align_center'
						onClick={() => remove(index)}
					>
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
			{visible_desc && (
				<TextArea
					className='desc_wrap w_100 border_box mt_4'
                              autoSize
                              placeholder='节点介绍'
                              value={ desc }
                              // @ts-ignore
					onChange={onChangeDesc}
				></TextArea>
			)}
		</div>
	)
}

export default window.$app.memo(Index)
