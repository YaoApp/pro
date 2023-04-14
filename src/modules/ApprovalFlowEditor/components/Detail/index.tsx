import { useMemoizedFn } from 'ahooks'
import { Select } from 'antd'
import { cx } from 'classix'

import { memo } from '@/utils/common'
import { X } from '@phosphor-icons/react'

import { MApprovalType } from '../../utils'
import useStyles from './styles'

import type { IPropsDetail } from '../../types'
import type { SelectProps } from 'antd'

const Index = (props: IPropsDetail) => {
	const { namespace, options, current_item, hide } = props
	const { classes } = useStyles()
	const emitter = window[`${namespace}_AFE`].emitter

	const onSelect: SelectProps['onSelect'] = useMemoizedFn((_, item) => {
		emitter.emit(`${namespace}/afe/updateCurrentItem`, { uid: item.value, label: item.label })
	})

	return (
		<div className={classes.local}>
			<div className={cx('w_100 h_100 border_box flex flex_column', classes.content)}>
				<div className='title_wrap w_100 border_box flex justify_between align_center'>
					<span className='title'>设置{MApprovalType[current_item.type].text}</span>
					<div className='icon_wrap flex align_center justify_center cursor_point' onClick={hide}>
						<X size={16}></X>
					</div>
				</div>
				<div className={cx('w_100 border_box flex flex_column', classes.detail)}>
					<Select
						className='w_100 select'
						options={options}
						value={current_item.uid !== -1 ? current_item.uid : undefined}
						placeholder={`选择${MApprovalType[current_item.type].text}`}
						onSelect={onSelect}
					></Select>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
