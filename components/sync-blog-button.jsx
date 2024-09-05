"use client"
import { syncPagetoMongo } from "@/db/notion"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useState } from "react"

export const SyncBlogButton = ({ blogId }) => {
  const [content, setContent] = useState("Sync Blog")
  const onClick = async () => {
    setContent("Syncing in progress")
    try {
      const ok = await syncPagetoMongo(blogId)
      if (ok) {
        toast.success("Sync blog finished")
      } else {
        toast.error("Sync blog error")
      }
      setContent("Sync Blog")
    } catch (error) {
      setContent("Sync Blog")
      toast.error("Sync blog error")
    }
  }
  return (
    <>
      <Button onClick={onClick}>{content}</Button>
    </>
  )
}
