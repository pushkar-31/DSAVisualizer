import { useState } from "react"
import { ArrayItem, ArrayOperation } from "@/components/visualizer/array/types"

let arrayItemIdCounter = 0

export function useArrayDs(defaultLength: number = 0) {
  const [items, setItems] = useState<ArrayItem[]>(
    Array.from({ length: defaultLength }, (_, index) => ({
      id: `array-item-${arrayItemIdCounter++}`,
      value: null,
      index,
    }))
  )
  const [operations, setOperations] = useState<ArrayOperation[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const declare = (size: number) => {
    const safeSize = Math.max(0, Math.min(size, 32))
    arrayItemIdCounter = 0
    setItems(
      Array.from({ length: safeSize }, (_, index) => ({
        id: `array-item-${arrayItemIdCounter++}`,
        value: null,
        index,
      }))
    )
    setOperations([])
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const setAtIndex = async (index: number, value: number) => {
    if (index < 0 || index >= items.length || isAnimating) return
    setIsAnimating(true)
    setOperations((prev) => [
      ...prev,
      { type: "set", index, value, timestamp: Date.now() },
    ])

    setHighlightedIndex(index)
    await new Promise((r) => setTimeout(r, 400))

    setItems((prev) =>
      prev.map((it) =>
        it.index === index ? { ...it, value } : it
      )
    )

    await new Promise((r) => setTimeout(r, 300))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const getAtIndex = async (index: number) => {
    if (index < 0 || index >= items.length || isAnimating) return
    setIsAnimating(true)
    setHighlightedIndex(index)
    await new Promise((r) => setTimeout(r, 300))
    const value = items[index]?.value ?? null
    setOperations((prev) => [
      ...prev,
      { type: "get", index, value, timestamp: Date.now() },
    ])
    await new Promise((r) => setTimeout(r, 200))
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  const clear = () => {
    setItems((prev) => prev.map((it) => ({ ...it, value: null })))
    setOperations((prev) => [
      ...prev,
      { type: "clear", timestamp: Date.now() },
    ])
    setHighlightedIndex(null)
    setIsAnimating(false)
  }

  return {
    items,
    operations,
    isAnimating,
    highlightedIndex,
    declare,
    setAtIndex,
    getAtIndex,
    clear,
  }
}


