import '@/presets'

import { useMemoizedFn } from 'ahooks'
import { cx } from 'classix'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useLayoutEffect } from 'react'

import { EditWrapper } from '@/components'
import { memo } from '@/utils'

import { Detail } from './components'
import data from './data'
import { useGraph } from './hooks'
import useStyles from './styles'
import { PortalProvider } from './utils/registerNodes'

import type { IEditWrapper } from '@/components'
import type { IPropsApprovalFlowEditor, IPropsDetail } from './types'

const Index = (props: IPropsApprovalFlowEditor) => {
	const { __namespace, usersApi } = props
	const value = props.value as IPropsApprovalFlowEditor['data'] | null
	const onChange = props.onChange as (...args: any) => void
	const { x, c } = useGraph(__namespace)
	const { classes } = useStyles()

	useLayoutEffect(() => {
		x.init(__namespace, usersApi)

		if (value) {
			x.raw_data = value?.length > 1 ? value : data
		} else {
			x.raw_data = data
		}

		return () => x.off()
	}, [])

	useEffect(() => onChange(toJS(x.raw_data)), [x.raw_data])

	const props_detail: IPropsDetail = {
		namespace: __namespace,
		options: toJS(x.services.user_options),
		current_item: toJS(x.current_item),
		hide: useMemoizedFn(() => (x.visible_detail = false))
	}

	return (
		<div className='w_100 flex justify_between'>
			<PortalProvider />
			<div className={cx(classes.graph, x.visible_detail && classes.show_detail)}>
				<div className='__graph_container' style={{ width: '100%' }} ref={c}></div>
			</div>
			{x.visible_detail && <Detail {...props_detail}></Detail>}
		</div>
	)
}

export default memo((props: IEditWrapper) => EditWrapper(observer(Index), props)())
