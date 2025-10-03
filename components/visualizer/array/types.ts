export interface ArrayItem {
  id: string
  value: number | null
  index: number
}

export type ArrayOperationType = 'set' | 'get' | 'clear'

export interface ArrayOperation {
  type: ArrayOperationType
  index?: number
  value?: number | null
  timestamp: number
}


