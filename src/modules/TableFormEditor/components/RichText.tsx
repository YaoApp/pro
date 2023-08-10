import { cx } from 'classix'
import { useEffect, useRef, useState } from 'react'

import EditorJS from '@editorjs/editorjs'

import editor_config from './MetaItem/editor_config'

import type { LogLevels } from '@editorjs/editorjs'

interface IProps {
	value: any
	autoHeight?: boolean
	onChange?: (v: any) => void
}

const Index = (props: IProps) => {
	const { value = [], autoHeight, onChange } = props
	const container = useRef<HTMLDivElement>(null)
	const editor = useRef<EditorJS>()
	const [instance, setInstance] = useState<EditorJS>()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (!container.current) return

		editor.current = new EditorJS({
			logLevel: 'ERROR' as LogLevels,
			holder: container.current,
			inlineToolbar: true,
			tools: editor_config,
			placeholder: '使用Tab快捷键可唤出选项列表',
			readOnly: !onChange,
			onChange: async () => {
				const res = await editor.current?.save?.()

				if (!res) return
				if (!onChange) return

				onChange(res.blocks)
			},
			onReady: () => {
				if (onChange) {
					const target = document.querySelector('.richtext_wrap .codex-editor')

					target!.setAttribute(
						'class',
						target!.getAttribute('class')!.replace('codex-editor--narrow', '')
					)
				}

				setInstance(editor.current)
			}
		})

		return () => editor.current?.destroy?.()
	}, [])

	useEffect(() => {
		if (onChange && loaded) return
		if (!value) return
		if (!instance) return

		editor.current?.render({
			blocks: value.length
				? value
				: [
						{
							id: 'lqNUJ3iFHm',
							type: 'paragraph',
							data: {
								text: ''
							}
						}
				  ]
		})

		setLoaded(true)
	}, [value, instance])

	return <div className={cx('richtext_wrap w_100 border_box', !autoHeight && 'has_height')} ref={container}></div>
}

export default window.$app.memo(Index)
