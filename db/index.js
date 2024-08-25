import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

export const mongoClient = new MongoClient(uri, options);

export const getBlogs = async () => {
  const db = mongoClient.db("blogs")
  const list = await db.collection("list").find().toArray();
  return list
};

export const getBlocks = async (pageid) => {
  const db = mongoClient.db("blogs");
  return await db.collection("block").find({ pageid }).toArray();
}
