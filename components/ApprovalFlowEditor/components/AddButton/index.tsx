import { useUpdateEffect } from 'ahooks'
import { ConfigProvider, Popover } from 'antd'
import { cx } from 'classix'
import { useState } from 'react'

import { memo } from '@/components/common'
import { Plus, User } from '@phosphor-icons/react'

import useStyles from './styles'

import type { IPropsAddButton } from '../../types'

const Index = (props: IPropsAddButton) => {
	const { emitter, namespace, index } = props
	const { classes } = useStyles()
	const [open, setOpen] = useState(false)

	useUpdateEffect(() => {
		emitter.emit(`${namespace}/afe/${open ? '' : 'un'}lockScroller`)
	}, [open])

	const insert = () => {
		setOpen(false)

		emitter.emit(`${namespace}/afe/insert`, index)
	}

	const Options = (
		<div className={cx('flex flex_column', classes.options)}>
			<span className='options_title'>添加流程节点</span>
			<div className='option_items w_100 flex'>
				<div
					className='option_item w_100 flex align_center transition_normal cursor_point'
					onClick={() => insert()}
				>
					<div className='icon_wrap flex justify_center align_center'>
						<User size={18} weight='fill'></User>
					</div>
					<span className='text'>审批人</span>
				</div>
			</div>
		</div>
	)

	return (
		<ConfigProvider prefixCls='xgen'>
			<Popover
				open={open}
				content={Options}
				trigger='click'
				placement='bottomLeft'
				align={{ offset: [-15, 0] }}
				onOpenChange={(v) => setOpen(v)}
			>
				<div
					className={cx(
						'w_100 h_100 border_box flex justify_center align_center white clickable',
						classes.local
					)}
				>
					<Plus size={15}></Plus>
				</div>
			</Popover>
		</ConfigProvider>
	)
}

export default memo(Index)
