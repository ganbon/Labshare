import prisma from "./Client"
import { NextApiRequest, NextApiResponse } from "next";

async function UserSearchAll(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'POST') {
    const result = await prisma.user.findMany({
        select: { 
        id: true,
        name: true, 
        student_number:true}})
        // console.log(result)
        res.status(200).json({response:result})
    }
}

// async function UserSearchAll() {
//     const result = await prisma.user.findMany({
//         select: { 
//         name: true, 
//         student_number:true}})
//     return result
// }

export default UserSearchAll