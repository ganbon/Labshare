import prisma from './Client'
import EncodeBase64 from '../../../components/Atoms/CipherEncode'
import { NextApiRequest, NextApiResponse } from "next";


async function UserCreate(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === 'POST') {
        const name = req.body.name
        const student_number = req.body.number
        const password = req.body.password
        if(typeof name !== "string" || typeof student_number !=="string" || typeof password !== "string"){
            res.status(405).json({response:"False"})
        }else{
        const passwords = EncodeBase64(password)
        await prisma.user.create({
            data:{
                name:name,
                student_number:student_number,
                password:passwords,
                profile:{
                    create:{abstract:""}
                }
            }
        })
        res.status(200).json({response:"True"})
    }
  }
}

// async function UserCreate(props:UserPropsType) {
//     const passwords = EncodeBase64(props.password)
//     await prisma.user.create({
//         data:{
//             name:props.name,
//             student_number:props.student_number,
//             password:passwords,
//             profile:{
//                 create:{abstract:""}
//             }
//         }
//       })
// }

export default UserCreate