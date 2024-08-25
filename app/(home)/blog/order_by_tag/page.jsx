import { Button } from "@/components/ui/button"
import { getBlogsOrderByTag } from "@/db"
import { CalendarArrowDown } from "lucide-react"
import { Book } from "lucide-react"
import Link from "next/link"

export default async function BlogOrderByTagPage() {

  const tagList = await getBlogsOrderByTag()
  return (
    <div>
      <div className="flex items-center justify-start">
        <p>我的博客</p>
        <Button variant="ghost" size="sm" className="ml-4">
          <Link href="order_by_date" className="flex items-center gap-1">
            <CalendarArrowDown className="w-[0.8rem] h-[0.8rem]" />
            按时间
          </Link>
        </Button>
      </div>
      <div className="opacity-60 flex flex-col gap-2 mt-6">
        {
          tagList.map(item => (
            <div key={item._id} className="mb-6">
              <p className="font-semibold text-xl mb-2">{item._id.name}
                「{item.data.length}」
              </p>
              <div className="ml-2 inline-flex flex-col">
                {
                  item.data.map(blog => (
                    <Link href={`/blog/${blog.id}`} key={blog.id} className="inline-flex items-center gap-1 leading-7">
                      {blog.icon.type === 'emoji'
                        ? <span>{blog.icon.emoji}</span>
                        : <Book className="w-[1rem] h-[1rem]" />
                      }
                      <span>{blog.properties.Title.title[0].plaintext}</span>
                    </Link>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
