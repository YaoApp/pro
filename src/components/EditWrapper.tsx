import { Item } from '@/components'
import { makeStyles } from '@/utils/common'

import type { InputProps } from 'antd'
import type { FC } from 'react'
import type { Component } from '@/types'

export interface IEditWrapper extends InputProps, Component.PropsEditComponent {
	id: string
}

export interface IEditComponent extends Omit<IEditWrapper, '__bind' | '__name' | 'itemProps'> {
	value: any
	onChange: (...args: any) => void
}

const useStyles = makeStyles()({
	local: {
		'.xgen-form-item-control-input': {
			backgroundColor: 'transparent'
		}
	}
})

const Index = (Component: FC<any>, props: IEditWrapper, options?: { hideBg?: boolean }) => {
	const { __bind, __name, itemProps, ...rest_props } = props
	const { classes } = useStyles()

	return () => (
		<Item {...itemProps} {...{ __bind, __name }} className={options?.hideBg ? classes.local : ''}>
			<Component {...rest_props} />
		</Item>
	)
}

export default Index
