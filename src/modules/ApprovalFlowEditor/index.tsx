import { useMemoizedFn } from 'ahooks'
import { cx } from 'classix'
import { deepEqual } from 'fast-equals'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect } from 'react'

import { EditWrapper } from '@/components'

import { Detail } from './components'
import data from './data'
import { useGraph } from './hooks'
import useStyles from './styles'
import { PortalProvider } from './utils/registerNodes'

import type { IEditWrapper } from '@/components'
import type { IPropsApprovalFlowEditor, IPropsDetail } from './types'

const Index = (props: IPropsApprovalFlowEditor) => {
	const { id, __namespace, usersApi, launcher, handler, onChange } = props
	const namespace = __namespace + id
	const { x, c } = useGraph(namespace, { launcher, handler })
	const { classes } = useStyles()

	useLayoutEffect(() => {
		x.init(namespace, usersApi, { launcher, handler }, onChange)

		if (!deepEqual(x.raw_data, props.value)) {
			if (props.value) {
				x.raw_data = props.value?.length > 1 ? props.value : data()
			} else {
				x.raw_data = data()
			}
		}

		return () => x.off()
	}, [props.value, id, __namespace, usersApi])

	const props_detail: IPropsDetail = {
		namespace,
		options: toJS(x.services.user_options),
		current_item: toJS(x.current_item),
		launcher,
		handler,
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

export default window.$app.memo((props: IEditWrapper) => EditWrapper(observer(Index), props, { hideBg: true })())
