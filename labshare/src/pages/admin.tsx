import type { NextPage } from "next";
import {useState} from "react"
import Form from "@/components/Atoms/Form";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import APIConnect from "@/components/Atoms/APIConnect";

const AdminPage:NextPage = () => {
  const {data:session,status} = useSession()
  const [name,setName] = useState<string>("")
  const [student_number,setNumber] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  else if(session?.user?.name === process.env.NEXT_PUBLIC_ADMIN_NUMBER){
      return (
      <>
      <h1>アカウント作成</h1>
      <Form title="名前" default="" setWord={setName}/>
      <Form title="学籍番号" default="" setWord={setNumber}/>
      <Form title="パスワード" default="" setWord={setPassword}/>
      <Button variant="contained" 
          onClick={() => APIConnect("http://localhost:3000/api/db/UserCreate",{name:name,number:student_number,password:password})}>
          アカウント作成</Button>
      </>
      )
  }else{
      return(
          <>
          無効なページです
          </>
      )
  }
  }

export default AdminPage