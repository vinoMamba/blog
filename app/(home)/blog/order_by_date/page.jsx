import { Button } from "@/components/ui/button"
import { getBlogsOrderByDate } from "@/db"
import Link from "next/link"
import dayjs from 'dayjs'
import { Tag } from "lucide-react"
import { Book } from "lucide-react"

export default async function BlogOrderByDatePage() {
  const list = await getBlogsOrderByDate()
  return (
    <div>
      <div className="flex items-center justify-start">
        <p>我的博客</p>
        <Button variant="ghost" size="sm" className="ml-4">
          <Link href="order_by_tag" className="flex items-center gap-1">
            <Tag className="w-[0.8rem] h-[0.8rem]" />
            按标签
          </Link>
        </Button>
      </div>
      <div className="opacity-60 flex flex-col gap-2 mt-6 ">
        {list.map(blog => (
          <p key={blog.id} className="inline-flex flex-col leading-7">
            <Link href={`/blog/${blog.id}`} className="inline-flex items-center gap-1 leading-7">
              {blog.icon.type === 'emoji'
                ? <span>{blog.icon.emoji}</span>
                : <Book className="w-[1rem] h-[1rem]" />
              }
              <span>{blog.properties.Title.title[0].plaintext}</span>
            </Link>
            <span className="text-sm">{dayjs(blog.properties.Date.date.start).format("YYYY-MM-DD")}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
