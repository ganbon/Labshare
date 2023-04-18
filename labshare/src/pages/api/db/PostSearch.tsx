import prisma from "./Client"
import { NextApiRequest, NextApiResponse } from "next";

async function PostSearch(
    req: NextApiRequest,
    res: NextApiResponse
    )
    {
    if (req.method === 'POST') {
    const post_id = req.body.id
    if (typeof post_id !== "string"){
        res.status(405).json({result:null})
    }else{
    const result = await prisma.post.findUnique({
        where: {id:post_id},
      })
    res.status(200).json({response:result})
    }
  }
}

export default PostSearch