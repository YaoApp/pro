import { useMemoizedFn } from 'ahooks'
import { Input, InputNumber, Radio, Select } from 'antd'

import RichText from '../RichText'

import type { IPropsMetaItem } from '../../types'
const { Option } = Select
const { Group } = Radio
const { TextArea } = Input

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

	if (v.type === 'boolean') {
		return (
			<Group value={value} onChange={({ target: { value } }) => onChange(k, value)}>
				<Radio value={true}>是</Radio>
				<Radio value={false}>否</Radio>
			</Group>
		)
	}

	if (v.type === 'Array<string>') {
		return <Select mode='tags' value={value} onChange={(value) => onChange(k, value)}></Select>
	}

	if (v.type === 'textarea') {
		return <TextArea rows={6} value={value} onChange={({ target: { value } }) => onChange(k, value)}></TextArea>
	}

	const onChangeRichText = useMemoizedFn((value) => onChange(k, value))

	if (v.type === 'richtext') {
		return <RichText value={value} onChange={onChangeRichText}></RichText>
	}

	if (v.type === 'td_richtext') {
		return <RichText autoHeight value={value} onChange={onChangeRichText}></RichText>
	}

	return null
}

export default window.$app.memo(Index)
