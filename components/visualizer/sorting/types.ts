export interface SortItem {
  id: string
  value: number
  index: number
}

export type SortActionType = 'compare' | 'swap' | 'set' | 'done'

export interface SortAction {
  type: SortActionType
  indices: number[]
  values?: number[]
}

export interface SortOperationLogEntry {
  step: number
  action: SortAction
}


