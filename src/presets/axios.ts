import { message } from 'antd'
import axios from 'axios'

import { getToken } from '@/utils'

axios.interceptors.request.use((config) => {
	config['headers']['Authorization'] = getToken()

	return config
})

axios.interceptors.response.use(
	(response) => response.data,
	(error) => {
		const res = error.response
		const data = res.data

		if (data && data.message) {
			message.error(data.message)
		} else {
			if (res.status && res.statusText) message.error(`${res.status} : ${res.statusText}`)
		}

		return Promise.reject(error)
	}
)
