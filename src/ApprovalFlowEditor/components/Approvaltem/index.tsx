import { cx } from 'classix'

import { node_memo } from '@/common'

import { MApprovalType } from '../../utils'
import useStyles from './styles'

import type { IPropsApprovalItem, AFE } from '../../types'

const Index = (props: IPropsApprovalItem) => {
	const { node } = props
	const { classes } = useStyles()
	const { label, type } = node.getData<AFE.RawDataItem>()

	const Icon = MApprovalType[type].icon

	return (
		<div className={cx('w_100 h_100 border_box flex flex_column transition_normal', classes.local)}>
			<div className={cx('header_wrap w_100 border_box flex align_center', classes.header_wrap, type)}>
				<span className='icon_wrap flex justify_center align_center mr_2'>
					<Icon size={12} weight='fill'></Icon>
				</span>
				<span className='text'> {MApprovalType[type].text}</span>
			</div>
			<div className={cx('w_100 border_box flex align_center', classes.detail_wrap)}>
				<span className='label'>{label}</span>
			</div>
		</div>
	)
}

export default node_memo(Index)
