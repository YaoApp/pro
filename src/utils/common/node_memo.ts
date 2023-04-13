import { memo } from 'react'

const Index = (el: any) => {
	return memo(el, (_, next) => Boolean(next.node?.hasChanged('data')))
}

export default Index
