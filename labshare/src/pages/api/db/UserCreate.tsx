import { PrismaClient } from "@prisma/client";
import EncodeBase64 from '../../../components/CipherEncode'
import { NextApiRequest, NextApiResponse } from "next";


async function UserCreate(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'POST') {
        const prisma = new PrismaClient()
        const name = req.body.name
        const student_number = req.body.number
        const password = req.body.password
        const grade = req.body.grade
        if(typeof name !== "string" || typeof student_number !=="string" || typeof password !== "string" 
            || typeof grade !== "string"){
            res.status(405).json({response:"False"})
        }else{
        const passwords = EncodeBase64(password)
        await prisma.user.create({
            data:{
                name:name,
                student_number:student_number,
                password:passwords,
                grade:grade,
                profile:{
                    create:{abstract:""}
                }
            }
        })
        res.status(200).json({response:"True"})
        await prisma.$disconnect()
    }
  }
}

export default UserCreate