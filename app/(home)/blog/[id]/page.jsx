import { CdButton } from "@/components/cd-button"
import { NotionPage } from "@/components/notion-page"
import { getBlocks } from "@/db"

export default async function BlogPage({ params }) {
  const data = await getBlocks(params.id) 
  return (
    <div className="pb-40">
      <article className="opacity-80">
        <NotionPage recordMap={data.data} />
      </article>
      <CdButton />
    </div>
  )
}
