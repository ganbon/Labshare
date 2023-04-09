import prisma from './Client'
import { NextApiRequest, NextApiResponse } from "next";

async function PostCreate(
    req: NextApiRequest,
    res: NextApiResponse
    )
    {
        if (req.method === 'POST') {
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
        }
    }
}


// async function PostCreate(props:PostPropsType) {
//     await prisma.post.create({
//         data:{
//             title:props.title,
//             content:props.content,
//             published:true,
//             authorId:props.user_id,
//         }
//       })
// }

export default PostCreate