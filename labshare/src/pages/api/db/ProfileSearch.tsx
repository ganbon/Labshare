import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function ProfileSearch(
  req: NextApiRequest,
  res: NextApiResponse
  ){
    if (req.method === 'POST') {
      const prisma = new PrismaClient()
      const user_id = req.body.id
      if (typeof user_id !== "string"){
          res.status(405).json({result:null})
      }else{
    const result = await prisma.user.findUnique({
        where: {id:user_id},
        include:{profile:true,
                posts:true}
      })
      res.status(200).json({response:result})
      await prisma.$disconnect()
    }
  }
}

export default ProfileSearch