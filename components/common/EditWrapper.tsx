import { Item } from '@/components/common'

import type { InputProps } from 'antd'
import type { FC } from 'react'
import type { Component } from '@/components/types'

export interface IEditWrapper extends InputProps, Component.PropsEditComponent {}

const Index = (Component: FC<any>, props: IEditWrapper) => {
	const { __bind, __name, itemProps, ...rest_props } = props

	return () => (
		<Item {...itemProps} {...{ __bind, __name }}>
			<Component {...rest_props} />
		</Item>
	)
}

export default Index
