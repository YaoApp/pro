import { nanoid } from 'nanoid'

import type { AFE } from './types'

export default () =>
	[
		{
			id: nanoid(),
			uid: -1,
			label: '未设置',
			type: 'initor'
		},
		{
			id: nanoid(),
			uid: -1,
			label: '未设置',
			type: 'approval'
		}
	] as AFE.RawData
