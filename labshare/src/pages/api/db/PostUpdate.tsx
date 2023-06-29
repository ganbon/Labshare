import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


async function PostUpdate(
    req: NextApiRequest,
    res: NextApiResponse
    )
    {
        if (req.method === 'POST') {
            const prisma = new PrismaClient()
            const {id,title,content} = req.body
            if(typeof id !== "string" || typeof content !=="string"
            || typeof title !== "string"){
                res.status(405).json({result:"False"})
            } 
            else{
            await prisma.post.update({
                where:{
                    id:id
                },
                data:{title:title,
                    content:content
                }
            })
            res.status(200).json({response:"True"})
            await prisma.$disconnect()
        }
    }
}

export default PostUpdate