import './utils/registerNodes'

import { observer } from 'mobx-react-lite'
import { useLayoutEffect } from 'react'

import { EditWrapper, memo } from '@/common'

import data from './data'
import { useGraph } from './hooks'

import type { IEditWrapper } from '@/common'
import type { IPropsApprovalFlowEditor, AFE } from './types'

const Index = (props: IPropsApprovalFlowEditor) => {
	const { __namespace } = props
	const { x, c } = useGraph(__namespace)

	useLayoutEffect(() => {
            x.init(__namespace)
            
		x.raw_data = data as AFE.RawData

		return () => x.off()
      }, [])
      
	return <div style={{ width: '100%' }} ref={c}></div>
}

export default memo((props: IEditWrapper) => EditWrapper(observer(Index), props)())
