"use server"
import { Client } from "@notionhq/client"
import { NotionAPI } from 'notion-client'
import { mongoClient } from "."
import dayjs from "dayjs"

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const notionCompat = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2
})

export const syncPagetoMongo = async (pageId) => {

  try {
    const data = await notionCompat.getPage(pageId)

    const db = mongoClient.db("blogs")
    await db.collection('block').deleteOne({ id: pageId })
    await db.collection('block').insertOne({ id: pageId, data, update_time: dayjs().format("YYYY-MM-DD:HH-mm-ss") })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}



export const syncNotionData = async () => {
  try {
    const db = mongoClient.db("blogs")
    const data = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      inTrash: false
    })

    const list = transformResults(data.results)
    await db.collection('list').deleteMany()
    await db.collection('list').insertMany(list)
    console.log("Sync list finished")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}


function transformResults(results = []) {
  return results.map(item => {
    const { properties } = item
    return {
      id: item.id,
      createdTime: item.created_time,
      lastEditedTime: item.last_edited_time,
      inTrash: item.in_trash,
      icon: item.icon.emoji || "",
      tags: properties.Tags.multi_select,
      status: properties.Status.status,
      year: properties.Date.date.start ? dayjs(properties.Date.date.start).format("YYYY") : '',
      date: properties.Date.date.start ? dayjs(properties.Date.date.start).format("YYYY-MM-DD") : '',
      title: properties.Title.title
    }
  })
}



// copied from  https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/map-image-url.ts
function defaultMapImageUrl(url, block) {
  if (!url) {
    return null
  }
  if (url.startsWith('data:')) {
    return url
  }
  if (url.startsWith('https://images.unsplash.com')) {
    return url
  }

  try {
    const u = new URL(url)

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com')
    ) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        return url
      }
    }
  } catch {
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`
  }

  url = `https://www.notion.so${url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
    }`

  const notionImageUrlV2 = new URL(url)
  let table = block.parent_table === 'space' ? 'block' : block.parent_table
  if (table === 'collection' || table === 'team') {
    table = 'block'
  }
  notionImageUrlV2.searchParams.set('table', table)
  notionImageUrlV2.searchParams.set('id', block.id)
  notionImageUrlV2.searchParams.set('cache', 'v2')

  url = notionImageUrlV2.toString()

  return url
}
