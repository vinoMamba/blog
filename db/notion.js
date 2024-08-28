"use server"
import { Client } from "@notionhq/client"
import { mongoClient } from "."
import dayjs from "dayjs"

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export const syncNotionData = async () => {
  try {
    const db = mongoClient.db("blogs")
    const data = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    const list = transformResults(data.results)
    await db.collection('list').deleteMany()
    await db.collection('list').insertMany(list)
    return "sync success"
  } catch (error) {
    console.log(error)
    return error
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
      icon: item.icon.emoji,
      // tags {
      //   "id": "f1c1e1da-ad19-4f14-9a26-3eb5af34e80d",
      //   "name": "browser",
      //   "color": "gray"
      // },
      tags: properties.Tags.multi_select,
      // "status": {
      //   "id": "9e40fe29-7557-430a-b6d9-f3473b8ef8bd",
      //   "name": "Not started",
      //   "color": "default"
      // }
      status: properties.Status.status,
      year: properties.Date.date.start ? dayjs(properties.Date.date.start).format("YYYY") : '',
      // title : [{
      //   "type": "text",
      //   "text": {
      //     "content": "什么是域名，什么又是DNS",
      //     "link": null
      //   },
      //   "annotations": {
      //     "bold": false,
      //     "italic": false,
      //     "strikethrough": false,
      //     "underline": false,
      //     "code": false,
      //     "color": "default"
      //   },
      //   "plain_text": "什么是域名，什么又是DNS",
      //   "href": null
      // }]
      title: properties.Title.title
    }
  })
}
