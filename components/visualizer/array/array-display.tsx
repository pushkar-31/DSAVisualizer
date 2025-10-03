"use client"

import { ArrayItem } from "./types"
import { motion, AnimatePresence } from "framer-motion"

interface ArrayDisplayProps {
  items: ArrayItem[]
  highlightedIndex: number | null
}

export function ArrayDisplay({ items, highlightedIndex }: ArrayDisplayProps) {
  return (
    <div className="relative h-[300px] bg-card rounded-lg p-6 flex items-center justify-center overflow-x-auto">
      <div className="flex gap-2">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor:
                  highlightedIndex === item.index
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted))',
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-md border border-primary/20 flex flex-col items-center justify-center"
            >
              <span className={`text-lg font-mono ${highlightedIndex === item.index ? 'text-primary-foreground' : ''}`}>
                {item.value ?? '∅'}
              </span>
              <span className={`text-xs mt-1 ${highlightedIndex === item.index ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                [{item.index}]
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}


