"use client"

import { Button } from "@/components/ui/button"
import { syncNotionData } from "@/db/notion"
import { useState } from "react"
import { toast } from "sonner"

export default function SyncPage() {
  const [content, setContent] = useState("Sync data")
  const handleSync = async () => {
    setContent('Syncing in progress...')
    const ok = await syncNotionData()
    if (ok) {
      toast.success("Sync successful")
    } else {
      toast.error("Sync failed")
    }
    setContent('Sync data')
  }
  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <Button onClick={handleSync}>{content}</Button>
    </main>
  )
}
