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
        grade:true,
        student_number:true}})
        res.status(200).json({response:result})
    }
}

export default UserSearchAll