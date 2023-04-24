import { useMemoizedFn } from 'ahooks'
import { Checkbox, Radio } from 'antd'
import { cx } from 'classix'
import { useMemo } from 'react'

import type { IPropsTd } from '../../types'
const { Group: CheckBoxGroup } = Checkbox
const { Group: RadioGroup } = Radio

const Index = (props: IPropsTd) => {
	const { td, tr_index, td_index, current_td_index, onTd } = props
	const { type, label, value, rowSpan, colSpan, props: td_props } = td

	const active = useMemo(() => {
		return current_td_index.tr_index === tr_index && current_td_index.td_index === td_index
	}, [tr_index, td_index, current_td_index])

	const props_span = useMemo(() => {
		const spans: any = {}

		if (rowSpan) spans['rowSpan'] = rowSpan
		if (colSpan) spans['colSpan'] = colSpan

		return spans
	}, [rowSpan, colSpan])

	const props_td = {
		...props_span,
		className: active ? 'active' : '',
		onClick: useMemoizedFn(() => onTd(tr_index, td_index))
	}

	if (type === 'Title') {
		return (
			<td {...props_td} className={cx('text_center font_bold', props_td.className)}>
				{label}
			</td>
		)
	}

	if (type === 'Input') {
		return (
			<td {...props_td}>
				<div className='w_100 flex align_center'>
					<span className='label'>{label}</span>
					<span className='value'>{value}</span>
				</div>
			</td>
		)
	}

	if (type === 'Checkbox') {
		return (
			<td {...props_td}>
				<div className='w_100 flex align_center'>
					<span className='label'>{label}</span>
					<CheckBoxGroup
						className='disabled'
						{...td_props}
						options={td_props?.options.map((item: string) => ({ label: item, value: item }))}
					></CheckBoxGroup>
				</div>
			</td>
		)
	}

	if (type === 'Radio') {
		return (
			<td {...props_td}>
				<div className='w_100 flex align_center'>
					<span className='label'>{label}</span>
					<RadioGroup
						className='disabled'
						{...td_props}
						options={td_props?.options.map((item: string) => ({ label: item, value: item }))}
					></RadioGroup>
				</div>
			</td>
		)
	}

	return null
}

export default window.$app.memo(Index)
