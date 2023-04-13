import { PaperPlaneTilt, User, UserCircle } from '@phosphor-icons/react'

export const MApprovalType = {
	initor: {
		text: '发起人',
		icon: UserCircle
	},
	approval: {
		text: '审批人',
		icon: User
	},
	copy: {
		text: '抄送人',
		icon: PaperPlaneTilt
	}
}
