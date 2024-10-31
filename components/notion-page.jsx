"use client"
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

export const NotionPage = ({ recordMap }) => {
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])
  return (
    <div>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={isDark}
        fullPage
        previewImages={false}
        className=' bg-transparent'
        disableHeader
        components={{
          Code,
          Collection,
          nextLink: Link,
        }}
      />
    </div>
  )
}
