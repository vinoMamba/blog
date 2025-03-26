import { Dashboard } from "@/components/dashboard"
import { getAllBlocks } from "@/db"


export default async function SyncPage() {
  const list = await getAllBlocks()
  return (
    <main className="flex flex-col max-w-screen-sm h-screen w-screen gap-2 mx-auto mt-20">
      <Dashboard data={list} />
    </main>
  )
}
