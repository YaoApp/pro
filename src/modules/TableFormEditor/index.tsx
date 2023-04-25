import { useMemoizedFn } from 'ahooks'
import { cx } from 'classix'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useState } from 'react'
import { container } from 'tsyringe'

import { EditWrapper } from '@/components'

import { Actions, Detail, Td } from './components'
import Model from './model'
import useStyles from './styles'

import type { IEditWrapper } from '@/components'
import type { IPropsProjectFlowEditor, IPropsDetail, IPropsActions } from './types'

const Index = (props: IPropsProjectFlowEditor) => {
	const { value, onChange } = props
	const [x] = useState(() => container.resolve(Model))
	const { classes } = useStyles()

	useLayoutEffect(() => {
		x.init(value, onChange)
	}, [])

	const onTd = useMemoizedFn((tr_index: number, td_index: number) => {
		x.detail_type = 'tableform'
		x.visible_detail = true
		x.current_td_index = { tr_index, td_index }
	})

	const onAction = useMemoizedFn((index: number, position: 'left' | 'right') => {
		x.detail_type = 'actions'
		x.visible_detail = true
		x.current_action_index = { index, position }
	})

	const props_detail: IPropsDetail = {
		detail_type: x.detail_type,
		current_td_item: toJS(x.current_td_item),
		current_action_item: toJS(x.current_action_item),
		onChange: useMemoizedFn(x.onChange),
		insertRow: useMemoizedFn(x.insertRow),
		insertCol: useMemoizedFn(x.insertCol),
		insertAction: useMemoizedFn(x.insertAction),
		remove: useMemoizedFn(x.remove),
		hideDetail: useMemoizedFn(() => (x.visible_detail = false))
	}

	const props_actions: IPropsActions = {
		actions: toJS(x.actions),
		current_action_index: toJS(x.current_action_index),
		onAction
	}

	return (
		<div className={cx('w_100 border_box flex justify_between', classes.local)}>
			<div className={cx('table_wrap flex flex_column', x.visible_detail && 'show_detail')}>
				<table>
					<tbody>
						{toJS(x.data).map((tr, tr_index) => {
							return (
								<tr key={tr_index}>
									{tr.map((td, td_index) => (
										<Td
											td={td}
											tr_index={tr_index}
											td_index={td_index}
											current_td_index={toJS(x.current_td_index)}
											onTd={onTd}
											key={td_index}
										></Td>
									))}
								</tr>
							)
						})}
					</tbody>
				</table>
				<Actions {...props_actions}></Actions>
			</div>
			{x.visible_detail && <Detail {...props_detail}></Detail>}
		</div>
	)
}

export default window.$app.memo((props: IEditWrapper) => EditWrapper(observer(Index), props)())
