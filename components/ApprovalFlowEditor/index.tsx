import './utils/registerNodes'

import { EditWrapper, memo } from '@/components/common'

import { useGraph } from './hooks'

import type { IEditWrapper } from '@/components/common'
import type { IPropsApprovalFlowEditor } from './types'

const Index = (props: IPropsApprovalFlowEditor) => {
	const { conatiner, g } = useGraph()

	return <div ref={conatiner}></div>
}

export default memo((props: IEditWrapper) => EditWrapper(Index, props)())
