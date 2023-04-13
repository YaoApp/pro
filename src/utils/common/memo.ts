import { deepEqual } from 'fast-equals'
import { memo } from 'react'

const Index = (el: any) => {
	return memo(el, (prev, next) => deepEqual(prev, next))
}

export default Index
