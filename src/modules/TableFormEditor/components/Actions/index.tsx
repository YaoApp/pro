import { useMemoizedFn } from 'ahooks'
import { Button } from 'antd'
import { cx } from 'classix'

import type { IPropsActions, TFE } from '../../types'
const Index = (props: IPropsActions) => {
	const { actions, current_action_index, onAction } = props

	const getActions = useMemoizedFn((arr: Array<TFE.Action>, position: 'left' | 'right') => {
		return arr?.map((item, index) => (
			<Button
				className={cx(
					'btn_action',
					current_action_index.index === index &&
						current_action_index.position === position &&
						'active'
				)}
				type={item.type === 'api' && item.isPrimary ? 'primary' : 'default'}
				size='small'
				key={index}
				onClick={() => onAction(index, position)}
			>
				{item.text}
			</Button>
		))
	})

	return (
		<div className='actions_wrap w_100 flex justify_between align_center'>
			<div className='left_actions flex align_center'>{getActions(actions?.left, 'left')}</div>
			<div className='right_actions flex align_center'>{getActions(actions?.right, 'right')}</div>
		</div>
	)
}

export default window.$app.memo(Index)
