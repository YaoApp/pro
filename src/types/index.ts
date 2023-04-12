export * from './global'
export * from './component'

export type DiffItem = { op: 'add' | 'replace' | 'remove'; path: Array<any>; value: any }
