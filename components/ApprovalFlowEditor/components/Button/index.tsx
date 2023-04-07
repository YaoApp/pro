import cx from 'classix'

import { memo } from '@/components/common'
import { Plus } from '@phosphor-icons/react'

import useStyles from './styles'

const Index = () => {
	const { classes } = useStyles()

	return (
		<div className={cx('w_100 h_100 border_box flex justify_center align_center white clickable', classes.local)}>
			<Plus size={15}></Plus>
		</div>
	)
}

export default memo(Index)
