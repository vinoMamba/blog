import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

export const mongoClient = new MongoClient(uri, options);


export const getAllBlocks = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").aggregate([
    {
      $lookup: {
        from: 'block',
        localField: 'id',
        foreignField: 'id',
        as: 'relatedB'
      }
    },
    {
      $unwind: {
        path: '$relatedB',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        id: 1,
        title: 1,
        lastUpdateTime: '$relatedB.update_time',
      }
    }
  ]).toArray()

  return list.map((item) => {
    return {
      id: item.id,
      title: item.title[0].plain_text,
      lastUpdateTime: item.lastUpdateTime
    }
  })

}

export const getBlogsOrderByDate = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").aggregate([
    { $match: { 'status.name': 'Done' } },
    { $unwind: '$year' },
    {
      $group: {
        _id: '$year',
        data: { $push: '$$ROOT' }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]).toArray()
  return list
};

export const getBlogsOrderByTag = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").aggregate([
    { $match: { 'status.name': 'Done' } },
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags.name',
        data: { $push: '$$ROOT' }
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ]).toArray()
  return list
};

export const getBlogInfoById = async (id) => {
  const db = mongoClient.db("blogs")
  const blogInfo = await db.collection("list").findOne({ id })
  return blogInfo
}


export const getBlocks = async (id) => {
  const db = mongoClient.db("blogs");
  return await db.collection("block").findOne({ id });
}
