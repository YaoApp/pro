import { useMemoizedFn } from 'ahooks'
import { cx } from 'classix'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { container } from 'tsyringe'

import { EditWrapper } from '@/components'

import { Detail, Td } from './components'
import data from './data'
import Model from './model'
import useStyles from './styles'

import type { IEditWrapper } from '@/components'
import type { IPropsProjectFlowEditor, IPropsDetail } from './types'

const Index = (props: IPropsProjectFlowEditor) => {
	const { value } = props
	const [x] = useState(() => container.resolve(Model))
	const { classes } = useStyles()

	const onTd = useMemoizedFn((tr_index: number, td_index: number) => {
		x.visible_detail = true
		x.current_td_item = data[tr_index][td_index]
		x.current_td_index = { tr_index, td_index }
	})

	const props_detail: IPropsDetail = {
		current_td_item: toJS(x.current_td_item)
	}

	return (
		<div className={cx('w_100 border_box flex justify_between', classes.local)}>
			<table className={cx('table_wrap', x.visible_detail && 'show_detail')}>
				<tbody>
					{data.map((tr, tr_index) => {
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
			{x.visible_detail && <Detail {...props_detail}></Detail>}
		</div>
	)
}

export default window.$app.memo((props: IEditWrapper) => EditWrapper(observer(Index), props)())
