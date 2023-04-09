import prisma from "./Client";
import { NextApiRequest, NextApiResponse } from "next";

async function ProfileSearch(
  req: NextApiRequest,
  res: NextApiResponse
  ){
    if (req.method === 'POST') {
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
    }
  }
}

export default ProfileSearch


// async function ProfileSearch(user_id:number) {
//   const prisma = new PrismaClient()
//   const result = await prisma.profile.findUnique({
//       where: {id:user_id}
//     })
//   return result
// }

// export default ProfileSearch