import { Header, Image, Marker, NestedList, Paragraph, Underline } from '@yaoapp/editorjs_plugins'

import type { EditorConfig } from '@editorjs/editorjs'

export default {
	marker: Marker,
	underline: Underline,
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
		toolbox: { title: '段落' }
	},
	header: {
		class: Header,
		inlineToolbar: true,
		toolbox: { title: '标题' }
	},
	list: {
		class: NestedList,
		inlineToolbar: true,
		toolbox: { title: '列表' }
	},
	image: {
		class: Image,
		config: {
			captionPlaceholder: '图片注释',
			endpoints: {
				byFile: 'https://aoya-pms.iqka.com/api/utils/upload/file',
				byUrl: 'https://aoya-pms.iqka.com/api/utils/upload/url'
			}
		},
		toolbox: { title: '图片' }
	}
} as EditorConfig['tools']
