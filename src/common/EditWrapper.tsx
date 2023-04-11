import { Item } from '@/common'

import type { InputProps } from 'antd'
import type { FC } from 'react'
import type { Component } from '@/types'

export interface IEditWrapper extends InputProps, Component.PropsEditComponent {}

export interface IEditComponent extends Omit<IEditWrapper, '__bind' | '__name' | 'itemProps'> {}

const Index = (Component: FC<any>, props: IEditWrapper) => {
	const { __bind, __name, itemProps, ...rest_props } = props

	return () => (
		<Item {...itemProps} {...{ __bind, __name }}>
			<Component {...rest_props} />
		</Item>
	)
}

export default Index
