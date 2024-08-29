import { DataTable } from "@/components/data.table"
import { SyncListButton } from "@/components/sync-list-button"
import { getAllBlocks } from "@/db"


export default async function SyncPage() {
  const list = await getAllBlocks()
  return (
    <main className="flex flex-col max-w-screen-sm justify-center h-screen w-screen gap-2 mx-auto">
      <SyncListButton />
      <DataTable data={list} />
    </main>
  )
}
