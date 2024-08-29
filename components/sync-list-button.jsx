"use client"
import { syncNotionData } from "@/db/notion"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useState } from "react"

export const SyncListButton = () => {
  const [content, setContent] = useState("Sync blog list")
  const onClick = async () => {
    setContent("Syncing in progress")
    try {
      const ok = await syncNotionData()
      if (ok) {
        toast.success("Sync blog list finished")
      } else {
        toast.error("Sync blog list error")
      }
      setContent("Sync blog list")
    } catch (error) {
      setContent("Sync blog list")
      toast.error("Sync blog list error")
    }
  }
  return (
    <>
      <Button onClick={onClick}>{content}</Button>
    </>
  )
}
