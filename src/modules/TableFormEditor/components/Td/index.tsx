import { useMemoizedFn } from 'ahooks'
import { Checkbox, Radio } from 'antd'
import { cx } from 'classix'
import { useMemo } from 'react'

import RichText from '../RichText'

import type { IPropsTd } from '../../types'
import type { PropsWithChildren } from 'react'

const { Group: CheckBoxGroup } = Checkbox
const { Group: RadioGroup } = Radio

const Wrapper = window.$app.memo(({ children, td }: PropsWithChildren & { td: IPropsTd['td'] }) => {
	return (
		<div className='flex align_center'>
			{td.prefix && <span className='prefix mr_4'>{td.prefix}</span>}
			{children}
			{td.suffix && <span className='suffix ml_4'>{td.suffix}</span>}
			{td.tips && <span className='tips ml_4'>（{td.tips}）</span>}
		</div>
	)
})

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
				<Wrapper td={td}>{label}</Wrapper>
			</td>
		)
	}

	if (type === 'Input') {
		return (
			<td {...props_td}>
				<Wrapper td={td}>
					<div className='w_100 flex align_center'>
						<span className='label'>{label}</span>
						<span className='value'>{value}</span>
					</div>
				</Wrapper>
			</td>
		)
	}

	if (type === 'Checkbox') {
		return (
			<td {...props_td}>
				<Wrapper td={td}>
					<div className='w_100 flex align_center'>
						<span className='label'>{label}</span>
						<CheckBoxGroup
							className='disabled'
							{...td_props}
							options={td_props?.options.map((item: string) => ({
								label: item,
								value: item
							}))}
						></CheckBoxGroup>
					</div>
				</Wrapper>
			</td>
		)
	}

	if (type === 'Radio') {
		return (
			<td {...props_td}>
				<Wrapper td={td}>
					<div className='w_100 flex align_center'>
						<span className='label'>{label}</span>
						<RadioGroup
							className='disabled'
							{...td_props}
							options={td_props?.options.map((item: string) => ({
								label: item,
								value: item
							}))}
						></RadioGroup>
					</div>
				</Wrapper>
			</td>
		)
	}

	if (type === 'RichText') {
		return (
			<td {...props_td}>
				<Wrapper td={td}>
					<RichText autoHeight value={value}></RichText>
				</Wrapper>
			</td>
		)
	}

	return null
}

export default window.$app.memo(Index)
