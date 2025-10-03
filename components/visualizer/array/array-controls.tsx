"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface ArrayControlsProps {
  onSet: (index: number, value: number) => void
  onGet: (index: number) => void
  onClear: () => void
  isAnimating: boolean
  length: number
  onDeclare: (size: number) => void
}

export function ArrayControls({
  onSet,
  onGet,
  onClear,
  isAnimating,
  length,
  onDeclare,
}: ArrayControlsProps) {
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState<string>("")
  const [size, setSize] = useState<string>("")

  const handleSet = () => {
    const num = Number(value)
    if (!isNaN(num) && index >= 0 && index < length) {
      onSet(index, num)
      setValue("")
    }
  }

  const handleGet = () => {
    if (index >= 0 && index < length) {
      onGet(index)
    }
  }

  const handleDeclare = () => {
    const n = Number(size)
    if (!isNaN(n) && n >= 0 && n <= 32) {
      onDeclare(n)
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Array Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Declare size (max 32)"
            onKeyDown={(e) => e.key === 'Enter' && handleDeclare()}
            disabled={isAnimating}
          />
          <Button onClick={handleDeclare} disabled={isAnimating}>
            Declare
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={index}
            min={0}
            max={Math.max(0, length - 1)}
            onChange={(e) => {
              const next = Number(e.target.value)
              const max = Math.max(0, length - 1)
              const clamped = Math.min(Math.max(0, next), max)
              setIndex(clamped)
            }}
            placeholder="Index"
            disabled={isAnimating || length === 0}
          />
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            onKeyDown={(e) => e.key === 'Enter' && handleSet()}
            disabled={isAnimating || length === 0}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={handleSet} disabled={isAnimating || length === 0}>
            Set
          </Button>
          <Button onClick={handleGet} disabled={isAnimating || length === 0} variant="secondary">
            Get
          </Button>
          <Button onClick={onClear} disabled={isAnimating} variant="destructive">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


