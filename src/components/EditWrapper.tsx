import { Item } from '@/components'
import { makeStyles } from '@/utils/common'

import type { InputProps } from 'antd'
import type { FC } from 'react'
import type { Component } from '@/types'

export interface IEditWrapper extends InputProps, Component.PropsEditComponent {}

export interface IEditComponent extends Omit<IEditWrapper, '__bind' | '__name' | 'itemProps'> {
	value: any
}

const useStyles = makeStyles()({
	local: {
		'.xgen-form-item-control-input': {
			backgroundColor: 'transparent'
		}
	}
})

const Index = (Component: FC<any>, props: IEditWrapper) => {
	const { __bind, __name, itemProps, ...rest_props } = props
	const { classes } = useStyles()

	return () => (
		<Item {...itemProps} {...{ __bind, __name }} className={classes.local}>
			<Component {...rest_props} />
		</Item>
	)
}

export default Index
