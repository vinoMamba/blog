import { getBlocks } from "@/db"

export default async function BlogPage({params}){
  const blog = await getBlocks(params.id)
  return (
    <div>{JSON.stringify(blog)}</div>
  )
}
