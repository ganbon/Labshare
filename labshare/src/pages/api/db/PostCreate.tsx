import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function PostCreate(
    req: NextApiRequest,
    res: NextApiResponse
    )
    {
        if (req.method === 'POST') {
            const prisma = new PrismaClient()
            const {title,content,published,user_id} = req.body
            if(typeof title !== "string" || typeof content !=="string" || 
                typeof published !== 'boolean' ||typeof user_id !== 'string'){
                res.status(405).json({result:"False"})
            } 
        else{
            await prisma.post.create({
                data:{
                    title:title,
                    content:content,
                    published:published,
                    authorId:user_id,
                }
            })
            res.status(200).json({response:"True"})
            await prisma.$disconnect()
        }
    }
}

export default PostCreate