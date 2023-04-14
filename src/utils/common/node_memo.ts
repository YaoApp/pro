import { memo } from 'react'

const Index = (el: any) => {
	return memo(el, (_, next) => !next?.node?.hasChanged('data'))
}

export default Index
