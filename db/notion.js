import { Client } from "@notionhq/client"
import { mongoClient } from "."

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export const syncBlogs = async () => {
  try {
    const data = await notion.databases.query({
      database_id: process.env.DATABASE_ID
    })

    const db = mongoClient.db('blog')
    await db.collection("docs").deleteMany()
    await db.collection("docs").insertMany(data.results)
    console.log("Sync data successful")
  } catch (error) {
    console.log(error)
  }
}

