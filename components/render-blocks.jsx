import { cn } from "@/lib/utils"
import Image from "next/image"

export const RenderBlocks = ({ blocks }) => {
  return (
    <div>
      {
        blocks.map(block => {
          return <RenderBlock block={block} key={block.id} />
        })
      }
    </div>
  )
}

function RenderBlock({ block }) {
  switch (block.type) {
    case 'bookmark':
      return null
    case 'breadcrumb':
      return null
    case 'bulleted_list_item':
      return null
    case 'callout':
      return null
    case 'child_database':
      return null
    case 'child_page':
      return null
    case 'code':
      return null
    case 'column_list':
      return null
    case 'column':
      return null
    case 'divider':
      return null
    case 'embed':
      return null
    case 'equation':
      return null
    case 'file':
      return null
    case 'heading_1':
      return <Heading1 block={block} />
    case 'heading_2':
      return <Heading2 block={block} />
    case 'heading_3':
      return <Heading3 block={block} />
    case 'image':
      return <NotionImage block={block} />
    case 'link_preview':
      return null
    case 'mention':
      return null
    case 'numbered_list_item':
      return <NumberedListItem block={block} />
    case 'paragraph':
      return <Paragraph block={block} />
    case 'pdf':
      return null
    case 'quote':
      return <Quote block={block} />
    case 'synced_block':
      return null
    case 'table':
      return null
    case 'table_of_contents':
      return null
    case 'to_do':
      return null
    case 'toggle':
      return null
    case 'video':
      return null
    default:
      return null
  }
}

function NotionImage({ block }) {
  const url = block.image[block.image.type].url.replace("./public", "")
  const width = block.image[block.image.type].width || 100
  const height = block.image[block.image.type].height || 100
  return (
    <div>
      <Image src={url} width={width} height={height} alt={url} />
    </div>
  )
}

function Heading1({ block }) {
  return (
    <div>
      {
        block.heading_1.rich_text.map((text, idx) => (
          <RichText key={idx} text={text} />
        ))
      }
    </div>
  )
}

function Heading2({ block }) {
  return (
    <div className=" mt-4">
      <div className="flex">
        <h3 className=" font-semibold text-2xl m-0 leading-7">
          {
            block.heading_2.rich_text.map((text, idx) => (
              <RichText key={idx} text={text} />
            ))
          }
        </h3>
      </div>
    </div>
  )
}


function Heading3({ block }) {
  return (
    <div>
      {
        block.heading_3.rich_text.map((text, idx) => (
          <RichText key={idx} text={text} />
        ))
      }
    </div>
  )
}

function NumberedListItem({ block }) {
  return (
    <div>
      {
        block.numbered_list_item.rich_text.map((text, idx) => (
          <RichText key={idx} text={text} />
        ))
      }
    </div>
  )
}


function Quote({ block }) {
  return (
    <div className=" w-full py-1">
      <blockquote className="m-0 px-[3px] py-[2px] flex">
        <div className="border-l-[3px] border-muted-foreground px-[14px] w-full">
          {
            block.quote.rich_text.map((text, idx) => (
              <RichText key={idx} text={text} />
            ))
          }
        </div>
      </blockquote>
    </div>
  )
}

function Paragraph({ block }) {
  return (
    <div className="flex ">
      <div className="min-h-6 w-full whitespace-pre-wrap break-words px-[3px] py-[2px]">
        {
          block.paragraph.rich_text.map((text, idx) => (
            <RichText key={idx} text={text} />
          ))
        }
      </div>
    </div>
  )
}

function RichText({ text }) {
  const { annotations } = text
  return (
    <span className={cn(
      annotations.bold && 'font-semibold',
      annotations.italic && 'italic',
      annotations.strikethrough && ' line-through',
      annotations.underline && ' underline',
    )}>{text.text.content}</span>
  )
}

