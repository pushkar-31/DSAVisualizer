import { useCallback, useMemo, useRef, useState } from "react"
import { SortAction, SortItem, SortOperationLogEntry } from "@/components/visualizer/sorting/types"

let sortItemIdCounter = 0

export function useBubbleSort(initialLength: number = 8) {
  const [items, setItems] = useState<SortItem[]>(
    Array.from({ length: initialLength }, (_, i) => ({
      id: `sort-item-${sortItemIdCounter++}`,
      value: Math.floor(Math.random() * 99) + 1,
      index: i,
    }))
  )
  const [log, setLog] = useState<SortOperationLogEntry[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlight, setHighlight] = useState<number[]>([])
  const playTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const generateLog = useCallback((arr: number[]): SortAction[] => {
    const actions: SortAction[] = []
    const a = arr.slice()
    const n = a.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        actions.push({ type: 'compare', indices: [j, j + 1] })
        if (a[j] > a[j + 1]) {
          const t = a[j]
          a[j] = a[j + 1]
          a[j + 1] = t
          actions.push({ type: 'swap', indices: [j, j + 1] })
        }
      }
    }
    actions.push({ type: 'done', indices: [] })
    return actions
  }, [])

  const compile = useCallback(() => {
    const base = items.map(it => it.value)
    const actions = generateLog(base)
    const compiled: SortOperationLogEntry[] = actions.map((action, idx) => ({ step: idx, action }))
    setLog(compiled)
    setCurrentStep(0)
    setHighlight([])
  }, [items, generateLog])

  const stepTo = useCallback((step: number) => {
    if (step < 0 || step >= log.length) return
    const base = items.map(it => it.value)
    const a = base.slice()
    const n = a.length
    for (let s = 0; s <= step; s++) {
      const { action } = log[s]
      if (action.type === 'compare') {
        // highlight only
        setHighlight(action.indices)
      } else if (action.type === 'swap') {
        const [i, j] = action.indices
        const t = a[i]
        a[i] = a[j]
        a[j] = t
      }
    }
    setItems(prev => prev.map((it, i) => ({ ...it, value: a[i] })))
    setCurrentStep(step)
  }, [log, items])

  const next = useCallback(() => stepTo(currentStep + 1), [currentStep, stepTo])
  const prev = useCallback(() => stepTo(currentStep - 1), [currentStep, stepTo])

  const play = useCallback(() => {
    if (isPlaying) return
    setIsPlaying(true)
    playTimer.current = setInterval(() => {
      setCurrentStep((s) => {
        const nextStep = s + 1
        if (nextStep >= log.length) {
          if (playTimer.current) clearInterval(playTimer.current)
          setIsPlaying(false)
          setHighlight([])
          return s
        }
        stepTo(nextStep)
        return nextStep
      })
    }, 600)
  }, [isPlaying, log.length, stepTo])

  const pause = useCallback(() => {
    if (playTimer.current) clearInterval(playTimer.current)
    setIsPlaying(false)
  }, [])

  const shuffle = useCallback(() => {
    setItems(prev => prev.map(it => ({ ...it, value: Math.floor(Math.random() * 99) + 1 })))
    setLog([])
    setCurrentStep(0)
    setHighlight([])
    setIsPlaying(false)
  }, [])

  const declare = useCallback((size: number) => {
    const len = Math.max(2, Math.min(size, 20))
    sortItemIdCounter = 0
    setItems(Array.from({ length: len }, (_, i) => ({
      id: `sort-item-${sortItemIdCounter++}`,
      value: Math.floor(Math.random() * 99) + 1,
      index: i,
    })))
    setLog([])
    setCurrentStep(0)
    setHighlight([])
    setIsPlaying(false)
  }, [])

  return {
    items,
    log,
    currentStep,
    isPlaying,
    highlight,
    compile,
    stepTo,
    next,
    prev,
    play,
    pause,
    shuffle,
    declare,
  }
}


