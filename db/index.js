import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

export const mongoClient = new MongoClient(uri, options);

export const getBlogsOrderByDate = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").find()
    .sort({ 'properties.Date.date.start': -1 })
    .toArray()
  return list
};

export const getBlogsOrderByTag = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").aggregate([
    { $unwind: '$properties.Tags.multiselect' },
    {
      $group: {
        _id: '$properties.Tags.multiselect',
        data: { $push: '$$ROOT' }
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


export const getBlocks = async (pageid) => {
  const db = mongoClient.db("blogs");
  return await db.collection("block").find({ pageid }).toArray();
}
