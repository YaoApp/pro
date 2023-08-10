import { useMemoizedFn } from 'ahooks'
import { Tooltip } from 'antd'
import { Fragment, useMemo } from 'react'

import { Columns, Rectangle, Rows, Trash, X } from '@phosphor-icons/react'

import metadata from '../../metadata'
import MetaItem from '../MetaItem'

import type { IPropsDetail } from '../../types'
const Index = (props: IPropsDetail) => {
	const {
		detail_type,
		current_td_item,
		current_action_item,
		onChange,
		insertRow,
		insertCol,
		insertAction,
		remove,
		hideDetail
	} = props
	const { type: td_type } = current_td_item
	const { type: action_type } = current_action_item

	const all_metadata = useMemo(() => {
		if (detail_type === 'tableform') return { ...metadata.common, ...metadata.components[td_type] }

		return { ...metadata.action.common, ...metadata.action[action_type] }
	}, [detail_type, metadata, td_type, action_type])

	const getValue = useMemoizedFn((key: string) => {
		if (detail_type === 'tableform') {
			if (key.indexOf('props_') !== -1) return current_td_item?.props?.[key.replace('props_', '')]

			// @ts-ignore
			return current_td_item[key]
		}

		// @ts-ignore
		return current_action_item[key]
	})

	console.log(all_metadata)

	return (
		<div className='detail_wrap flex flex_column'>
			<div className='header_wrap w_100 border_box flex justify_between align_center'>
				<div className='flex align_center'>
					{detail_type === 'tableform' ? (
						<Fragment>
							<Tooltip title='插入行'>
								<div
									className='icon_wrap flex justify_center align_center mr_4 clickable'
									onClick={insertRow}
								>
									<Rows size={16}></Rows>
								</div>
							</Tooltip>
							<Tooltip title='插入列'>
								<div
									className='icon_wrap flex justify_center align_center mr_4 clickable'
									onClick={insertCol}
								>
									<Columns size={16}></Columns>
								</div>
							</Tooltip>
						</Fragment>
					) : (
						<Tooltip title='添加按钮'>
							<div
								className='icon_wrap flex justify_center align_center mr_4 clickable'
								onClick={insertAction}
							>
								<Rectangle size={16}></Rectangle>
							</div>
						</Tooltip>
					)}

					<Tooltip title='删除'>
						<div
							className='icon_wrap flex justify_center align_center clickable'
							onClick={remove}
						>
							<Trash size={16}></Trash>
						</div>
					</Tooltip>
				</div>
				<div className='icon_wrap flex justify_center align_center clickable' onClick={hideDetail}>
					<X size={16}></X>
				</div>
			</div>
			<div className='detail_items_wrap w_100 border_box flex flex_column'>
				{Object.keys(all_metadata).map((key: any) => (
					<div className='detail_item_wrap w_100 flex flex_column' key={key}>
						<div className='form_label'>{(all_metadata as any)[key].label}</div>
						<MetaItem
							// @ts-ignore
							k={key}
							// @ts-ignore
							v={all_metadata[key]}
							// @ts-ignore
							value={getValue(key)}
							onChange={onChange}
						></MetaItem>
					</div>
				))}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
