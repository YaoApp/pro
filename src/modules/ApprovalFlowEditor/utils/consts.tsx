import { Icon } from '@/components'
import { PaperPlaneTilt, User, UserCircle } from '@phosphor-icons/react'

import type { IPropsApprovalFlowEditor } from '../types'

interface Args extends Pick<IPropsApprovalFlowEditor, 'launcher' | 'handler'> {}

export const MApprovalType = ({ launcher, handler }: Args) => ({
	initor: {
		text: launcher?.title ?? '发起人',
		icon: launcher?.icon ? (
			<Icon className='mr_2' name={launcher.icon} size={12}></Icon>
		) : (
			<UserCircle className='mr_2' size={12} weight='fill'></UserCircle>
		)
	},
	approval: {
		text: handler?.title ?? '审批人',
		icon: handler?.icon ? (
			<Icon className='mr_2' name={handler.icon} size={12}></Icon>
		) : (
			<User className='mr_2' size={12} weight='fill'></User>
		)
	},
	copy: {
		text: '抄送人',
		icon: <PaperPlaneTilt className='mr_2' size={12} weight='fill'></PaperPlaneTilt>
	}
})
