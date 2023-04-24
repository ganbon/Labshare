import prisma from "./Client"
import type { NextApiRequest, NextApiResponse } from 'next'

async function UserSearch(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      const student_number = req.body.number
      if (typeof student_number !== "string"){
        res.status(405).json({user:null})
    }else{
    const result = await prisma.user.findFirst({
        where: {
                student_number:{contains:student_number},
        },
        select: {
          id:true,
          student_number:true,
          grade:true,
          password:true,
        },
      })
    if(result){
      res.status(200).json({response:result})
    }else{
      res.status(200).json({response:null})
    }
  }
  }
}

export default UserSearch