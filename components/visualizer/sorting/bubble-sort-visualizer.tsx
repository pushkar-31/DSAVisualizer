"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { useBubbleSort } from "@/hooks/use-bubble-sort"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BubbleSortVisualizer() {
  const {
    items,
    log,
    currentStep,
    isPlaying,
    highlight,
    compile,
    next,
    prev,
    play,
    pause,
    shuffle,
    declare,
  } = useBubbleSort()

  const [size, setSize] = useState<string>("")

  const describe = (t: string, indices: number[]) => {
    if (t === 'compare') return `Compare indices ${indices[0]} and ${indices[1]}`
    if (t === 'swap') return `Swap indices ${indices[0]} and ${indices[1]}`
    if (t === 'done') return `Sorting complete`
    return t
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Bubble Sort</h1>
        <p className="text-muted-foreground">Visualize comparisons and swaps step-by-step.</p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Input
                      type="number"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="Declare size (2-20)"
                    />
                    <Button onClick={() => declare(Number(size))}>Declare</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={shuffle} variant="secondary">Shuffle</Button>
                    <Button onClick={compile}>Compile Steps</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={prev} disabled={log.length === 0 || currentStep <= 0}>Prev</Button>
                    {isPlaying ? (
                      <Button onClick={pause} variant="secondary">Pause</Button>
                    ) : (
                      <Button onClick={play} variant="secondary" disabled={log.length === 0}>Play</Button>
                    )}
                    <Button onClick={next} disabled={log.length === 0 || currentStep >= log.length - 1}>Next</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Steps: {log.length} | Current: {currentStep}</div>
                </CardContent>
              </Card>
            </div>
            <div className="xl:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-end justify-center gap-2">
                    {items.map((it, idx) => (
                      <motion.div
                        key={it.id}
                        animate={{
                          height: `${Math.max(10, it.value) * 2}px`,
                          backgroundColor: highlight.includes(idx)
                            ? 'hsl(var(--primary))'
                            : 'hsl(var(--muted))',
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-8 sm:w-10 md:w-12 rounded-t-md border border-primary/20 flex items-end justify-center"
                        title={`${it.value}`}
                      >
                        <span className={`mb-2 text-xs font-mono ${highlight.includes(idx) ? 'text-primary-foreground' : 'text-foreground'}`}>{it.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Step-by-step Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              {log.length === 0 ? (
                <div className="text-muted-foreground text-sm">Click "Compile Steps" to generate the step-by-step explanation.</div>
              ) : (
                <div className="max-h-[480px] overflow-auto space-y-2">
                  {log.map((entry, idx) => (
                    <div
                      key={entry.step}
                      className={`text-sm p-2 rounded border ${idx === currentStep ? 'bg-primary/10 border-primary/30' : 'border-primary/10'}`}
                    >
                      <span className="font-mono mr-2">#{idx}</span>
                      <span>{describe(entry.action.type, entry.action.indices)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


