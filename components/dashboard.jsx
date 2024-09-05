"use client"
import { SyncListButton } from "./sync-list-button"
import { DataTable } from "./data.table"
import { useState } from "react"
import { Input } from "./ui/input"
import { validatePassword } from "@/app/admin/notion/sync/me/validation"

export const Dashboard = ({ data }) => {
  const [show, setShow] = useState(false)
  const [pwd, setPwd] = useState('')
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      validatePassword({ pwd }).then(res => {
        if (res) {
          setShow(true)
        }
      })
    }
  }
  return (
    <>
      {
        show
          ? (
            <>
              <SyncListButton />
              <DataTable data={data} />
            </>)
          : <Input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={onKeyDown}
          />
      }
    </>
  )
}
