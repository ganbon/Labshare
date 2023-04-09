import type { NextPage } from "next";
import Header from "@/components/Atoms/Header";
import MarkDownEditor from "@/components/Atoms/MarkdownEditer";
import {useState} from "react"
import Form from "@/components/Atoms/Form";
import { Button } from "@mui/material";
import APIConnect from "@/components/Atoms/APIConnect";
import { useSession } from "next-auth/react";

const WritingPage:NextPage = () => {
    const {data:session,status} = useSession()
    const [title,setTitle] = useState<string>("")
    const [contents,setContents] = useState<string>("")
    if (status === 'loading') {
        return <div>Loading...</div>;
      }
      else if(session && session.user && session.user.email){
        return (
        <>
        <Header></Header>
        <Form title="タイトル" default="" setWord={setTitle}/>
        <MarkDownEditor default="..." setMarkdown={setContents}/>
        <Button variant="contained" 
            onClick={() => APIConnect("http://localhost:3000/api/db/PostCreate",{title:title,content:contents,published:true,user_id:session.user.email})}>
            新規作成</Button>
        </>
    )}else{
        return(
        <>
          無効なページです
        </>
        )
    }
}
    
export default WritingPage