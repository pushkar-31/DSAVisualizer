"use client"

import { ArrayControls } from "./array-controls"
import { ArrayDisplay } from "./array-display"
import { ArrayOperations } from "./array-operations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/shared/markdown-content"
import { useArrayDs } from "@/hooks/use-array"

interface ArrayVisualizerProps {
  content: React.ReactNode
}

export function ArrayVisualizer({ content }: ArrayVisualizerProps) {
  const {
    items,
    operations,
    isAnimating,
    highlightedIndex,
    declare,
    setAtIndex,
    getAtIndex,
    clear,
  } = useArrayDs()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Array</h1>
        <p className="text-muted-foreground">
          A contiguous memory structure with constant-time random access by index.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <ArrayControls
                onSet={setAtIndex}
                onGet={getAtIndex}
                onClear={clear}
                isAnimating={isAnimating}
                length={items.length}
                onDeclare={declare}
              />
              <ArrayOperations operations={operations} />
            </div>
            <div className="xl:col-span-2">
              <ArrayDisplay items={items} highlightedIndex={highlightedIndex} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation" className="space-y-6">
          <ArrayOperations operations={operations} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


