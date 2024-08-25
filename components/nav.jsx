"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./theme-toggle"

const linkList = [
  { href: "/", title: '关于' },
  { href: "/blog", title: '博客' },
  { href: "/project", title: '项目' },
]

export const TopNav = () => {
  const pathName = usePathname()
  return (
    <nav className="flex items-end justify-between pt-6 px-4 md:px-0 opacity-60">
      <div className="flex flex-row items-start gap-4 dark:text-white/80 text-black/80">
        {
          linkList.map(item => (
            <Link
              className={cn(pathName === item.href ? 'font-semibold dark:text-white text-black' : '')}
              href={item.href} key={item.href}>{item.title}</Link>
          ))
        }
      </div>
      <ModeToggle />
    </nav>
  )
}
