import type { NextPage } from "next";
import {useState} from "react"
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import SelectGrade from "@/components/Selectgrad";
import Router from "next/router";
import Head from "next/head";
import PassForm from "@/components/PassForm";
import APIConnect from "@/components/APIConnect";

const AdminPage:NextPage = () => {
  const {data:session,status} = useSession()
  const [name,setName] = useState<string>("")
  const [student_number,setNumber] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [grade,setGrade] = useState<string>("B3")
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  else if(session?.user?.name === process.env.NEXT_PUBLIC_ADMIN_NUMBER){
    const Create = async () => {
      await APIConnect(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/db/UserCreate`,{name:name,number:student_number,password:password,grade:grade})
      await Router.push(`${process.env.NEXT_PUBLIC_ROOTPATH}/`)
  }
      return (
      <>
      <Head>
  <title>Lab Share</title>
  </Head>
      <h1>アカウント作成</h1>
      <Form title="名前" default="" setWord={setName}/>
      <Form title="学籍番号" default="" setWord={setNumber}/>
      <PassForm title="パスワード" default="" setWord={setPassword}/>
      <SelectGrade setGrade={setGrade} grade="B3"/>
      <Button variant="contained" 
          onClick={() => Create()}>
          アカウント作成</Button>
      </>
      )
  }else{
      return(
          <>
          <Head>
  <title>error</title>
  </Head>
          無効なページです
          </>
      )
  }
  }

export default AdminPage