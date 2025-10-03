import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrayOperation } from "./types"
import { Eye, Pencil, Eraser } from "lucide-react"

interface ArrayOperationsProps {
  operations: ArrayOperation[]
}

export function ArrayOperations({ operations }: ArrayOperationsProps) {
  if (operations.length === 0) return null

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Operation History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {operations.map((op) => (
            <div key={op.timestamp} className="flex items-center gap-2 text-sm">
              {op.type === 'set' ? (
                <>
                  <Pencil className="h-4 w-4 text-green-500" />
                  <span>Set [{op.index}] = {op.value}</span>
                </>
              ) : op.type === 'get' ? (
                <>
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span>Get [{op.index}] -&gt; {op.value}</span>
                </>
              ) : (
                <>
                  <Eraser className="h-4 w-4 text-red-500" />
                  <span>Clear</span>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


