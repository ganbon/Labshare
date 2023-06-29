import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import EncodeBase64 from '../../../components/CipherEncode'

async function ProfileUpdate(
  req: NextApiRequest,
  res: NextApiResponse
  ){
    if (req.method === 'POST') {
      const prisma = new PrismaClient()
      const {id,password} = req.body
      if (typeof password !== "string" || typeof id !== "string"){
          res.status(405).json({result:null})
      }else{
    const EncodePassword =  EncodeBase64(password)
    const result = await prisma.user.update({
        where: {id:id},
        data : {password:EncodePassword}
      })
      res.status(200).json({response:"True"})
      await prisma.$disconnect()
    }
  }
}

export default ProfileUpdate