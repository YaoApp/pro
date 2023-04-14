import { Portal, register } from '@antv/x6-react-shape'

import { Approvaltem } from '../components'

register({
	shape: 'Approvaltem',
	component: Approvaltem,
	effect: ['data'],
	width: 210,
	height: 72
})

export const PortalProvider = Portal.getProvider()
