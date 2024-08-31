"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export const CdButton = () => {
  const router = useRouter()
  const onClick = () => {
    router.back()
  }
  return (
    <Button onClick={onClick} variant="link" className=" underline">cd ..</Button>
  )
}
