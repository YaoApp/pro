import { useMemoizedFn } from 'ahooks'
import { cx } from 'classix'
import { useMemo, MouseEvent } from 'react'

import { node_memo } from '@/utils/common'
import { X } from '@phosphor-icons/react'

import { MApprovalType } from '../../utils'
import useStyles from './styles'

import type { IPropsApprovalItem, AFE, Options } from '../../types'

const Index = (props: IPropsApprovalItem) => {
	const { node } = props
	const { classes } = useStyles()
	const { label, type, namespace, launcher, handler } = node.getData<
		AFE.RawDataItem & { namespace: string } & Options
	>()
	const emitter = window[`${namespace}_AFE`].emitter

	const node_info = useMemo(() => MApprovalType({ launcher, handler })[type], [type, launcher, handler])

	const remove = useMemoizedFn((e: MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation()

		emitter.emit(`${namespace}/afe/remove`, node.id)
	})

	const edit = useMemoizedFn(() => {
		emitter.emit(`${namespace}/afe/setCurrentItem`, node.id)
	})

	return (
		<div
			className={cx('w_100 h_100 border_box flex flex_column transition_normal', classes.local)}
			onClick={edit}
		>
			<div
				className={cx(
					'header_wrap w_100 border_box flex align_center justify_between',
					classes.header_wrap,
					type
				)}
			>
				<div className='flex align_center'>
					{node_info.icon}
					<span className='text'> {node_info.text}</span>
				</div>
				{type !== 'initor' && (
					<span
						className='icon_remove_wrap flex justify_center align_center mr_2 transition_normal none'
						onClick={remove}
					>
						<X size={12} weight='bold'></X>
					</span>
				)}
			</div>
			<div className={cx('w_100 border_box flex align_center', classes.detail_wrap)}>
				<span className='label'>{label}</span>
			</div>
		</div>
	)
}

export default node_memo(Index)
