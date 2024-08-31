import { CdButton } from "@/components/cd-button"
import { RenderBlocks } from "@/components/render-blocks"
import { Separator } from "@/components/ui/separator"
import { getBlocks, getBlogInfoById } from "@/db"
import { tagColors } from "@/lib/notion_tag_color"
import { cn } from "@/lib/utils"
import { Logs } from "lucide-react"
import { CalendarDays } from "lucide-react"
import { Book } from "lucide-react"

export default async function BlogPage({ params }) {
  const blog = await getBlocks(params.id)
  const blogInfo = await getBlogInfoById(params.id)
  return (
    <div className="pb-40">
      <article className="opacity-80">
        <h1 className=" text-3xl font-semibold flex items-center gap-2 mb-4">
          {blogInfo.icon
            ? <span>{blogInfo.icon}</span>
            : <Book className="w-[2rem] h-[2rem]" />
          }
          <span>{blogInfo.title[0].plain_text}</span>
        </h1>
        <p className="flex items-center gap-4 opacity-70 py-1">
          <span className="flex items-center gap-1"> <CalendarDays className="w-[1rem] h-[1rem]" /> Date</span>
          <span>{blogInfo.date}</span>
        </p>
        <p className="flex items-center gap-4 opacity-70 py-1">
          <span className="flex items-center gap-1"> <Logs className="w-[1rem] h-[1rem]" /> Tags</span>
          <span className="flex items-start gap-2">
            {
              blogInfo.tags.map(tag => (
                <span style={{ background: tagColors[tag.color] }} className={cn("text-white px-1 rounded-sm text-sm")}
                  key={tag.id}>
                  {tag.name}
                </span>
              ))
            }
          </span>
        </p>
        <Separator className="my-2" />

        <section>
          <RenderBlocks blocks={blog.blocks} />
        </section>
      </article>
      <CdButton />
    </div>
  )
}
