import { Input, InputNumber, Select } from 'antd'

const { Option } = Select

import type { IPropsMetaItem } from '../../types'

const Index = (props: IPropsMetaItem) => {
	const { k, v, value, onChange } = props

	if (v.type === 'select') {
		return (
			<Select value={value} onChange={(value) => onChange(k, value)}>
				{v.options?.map((item) => (
					<Option value={item.type} key={item.label}>
						{item.label}
					</Option>
				))}
			</Select>
		)
	}

	if (v.type === 'string' || v.type === 'any') {
		return <Input value={value} onChange={({ target: { value } }) => onChange(k, value)}></Input>
	}

	if (v.type === 'number') {
		return <InputNumber value={value} onChange={(value) => onChange(k, value)}></InputNumber>
	}

	if (v.type === 'Array<string>') {
		return (
			<Select
				mode='tags'
				value={value}
				onChange={(value) => onChange(k, value)}
			></Select>
		)
	}

	return null
}

export default window.$app.memo(Index)
