"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SortingHubPage() {
  const items = [
    { name: 'Bubble Sort', href: '/visualizer/sorting/bubble' },
    { name: 'Selection Sort', href: '/visualizer/sorting/selection' },
    { name: 'Insertion Sort', href: '/visualizer/sorting/insertion' },
    { name: 'Merge Sort', href: '/visualizer/sorting/merge' },
    { name: 'Quick Sort', href: '/visualizer/sorting/quick' },
    { name: 'Heap Sort', href: '/visualizer/sorting/heap' },
  ]

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Sorting Algorithms</h1>
        <p className="text-muted-foreground">Choose an algorithm to visualize it step-by-step.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <Link key={it.href} href={it.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>{it.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interactive visualization with step-by-step actions.</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


