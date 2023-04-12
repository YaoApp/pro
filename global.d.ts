import type Emittery from 'emittery'

declare global {
	interface Window {
		[key: `${string}_AFE`]: {
			emitter: Emittery
		}
	}
}

export {}
