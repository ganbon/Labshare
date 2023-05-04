import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

async function UserSearchAll(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'POST') {
    const prisma = new PrismaClient()
    const result = await prisma.user.findMany({
        select: { 
        id: true,
        name: true, 
        grade:true,
        student_number:true}})
        res.status(200).json({response:result})
        await prisma.$disconnect()
    }
    
}

export default UserSearchAll