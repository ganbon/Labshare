import prisma from "./Client";
import { NextApiRequest, NextApiResponse } from "next";

async function ProfileUpdate(
  req: NextApiRequest,
  res: NextApiResponse
  ){
    if (req.method === 'POST') {
      const {id,name,number,abstract,grade} = req.body
      if (typeof name !== "string" ||typeof number !== "string" 
      || typeof abstract !== "string" || typeof id !== "string"){
          res.status(405).json({result:null})
      }else{
    const result = await prisma.user.update({
        where: {id:id},
        data : {name:name,
            student_number:number,
            grade:grade,
            }
      })
    const result2 = await prisma.profile.update({
        where: {userId:id},
        data:{abstract:abstract}
    })
      res.status(200).json({response:"True"})
    }
  }
}

export default ProfileUpdate