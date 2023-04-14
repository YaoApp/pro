import { deepEqual } from 'fast-equals'
import { memo } from 'react'

type Memo = <T>(el: (props: T) => JSX.Element | null) => React.MemoExoticComponent<(props: T) => JSX.Element | null>

const Index: Memo = (el) => {
	return memo(el, (prev, next) => deepEqual(prev, next))
}

export default Index
