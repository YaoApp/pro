import type Emittery from 'emittery'
import type Axios from 'axios'

declare global {
	interface Window {
		[key: `${string}_AFE`]: {
			emitter: Emittery
		}
		$axios: Axios
		$app: {
			api_prefix: string
			Event: Emittery
			memo: <T>(
				el: (props: T) => JSX.Element | null
			) => React.MemoExoticComponent<(props: T) => JSX.Element | null>
		}
	}
}

export {}
