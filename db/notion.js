"use server"
import { Client, iteratePaginatedAPI } from "@notionhq/client"
import { mongoClient } from "."
import dayjs from "dayjs"
import axios from "axios"
import { createWriteStream, existsSync, lstatSync, mkdirSync, readdirSync, rmdirSync, unlinkSync } from "fs"
import Jimp from 'jimp'

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
    console.log("Sync list finished")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const syncBlocks = async (blogId) => {
  try {

    const results = await retrieveBlockChildren(blogId)
    const blocks = transformBlocks(results)

    mkRootDir()
    mkBlogDir(blogId)

    for (let index = 0; index < blocks.length; index++) {
      if (blocks[index].type === 'image') {
        const filePath = `./public/notion/${blogId}/${index}.png`
        await downloadImageToLocal(blocks[index], filePath)
        blocks[index].image[blocks[index].image.type].url = filePath

        const img = await Jimp.read(filePath)

        blocks[index].image[blocks[index].image.type].width = img.getWidth()
        blocks[index].image[blocks[index].image.type].height = img.getHeight()

        console.log(blocks[index])
      }
    }

    const db = mongoClient.db("blogs")
    await db.collection('block').deleteOne({ id: blogId })
    await db.collection('block').insertOne({ id: blogId, blocks, update_time: dayjs().format("YYYY-MM-DD:HH-mm-ss") })
    console.log("sync blocks success")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}


function mkRootDir() {
  if (!existsSync("./public/notion")) {
    mkdirSync("./public/notion")
  }
}

function mkBlogDir(blogId) {
  const blogPath = `./public/notion/${blogId}`
  if (existsSync(blogPath)) {
    deleteFolderRecursive(blogPath)
  }
  mkdirSync(blogPath)
}

function deleteFolderRecursive(path) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (lstatSync(curPath).isDirectory()) {
        // 如果是文件夹，递归删除
        deleteFolderRecursive(curPath);
      } else {
        // 如果是文件，直接删除
        unlinkSync(curPath);
      }
    });
    rmdirSync(path); // 删除空文件夹
  }
};

function transformBlocks(blocks) {
  const newBlocks = blocks.map(block => {
    return {
      id: block.id,
      type: block.type,
      [block.type]: block[block.type]
    }
  })
  return newBlocks
}

async function downloadImageToLocal(block, filePath) {
  const url = block.image[block.image.type].url

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(createWriteStream(filePath));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });
    response.data.on('error', (error) => {
      reject(error);
    });
  });
}


async function retrieveBlockChildren(id) {
  console.log(`Retrieving blocks from pageId:${id} (async)...`)
  const blocks = []
  // Use iteratePaginatedAPI helper function to get all blocks first-level blocks on the page
  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: id, // A page ID can be passed as a block ID: https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks
  })) {
    blocks.push(block)
  }
  return blocks
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
      date: properties.Date.date.start ? dayjs(properties.Date.date.start).format("YYYY-MM-DD") : '',
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
