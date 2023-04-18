import type { NextPage } from "next";
import Router from "next/router";
import Header from "@/components/Header";
import MarkDownEditor from "@/components/MarkdownEditer";
import {useState} from "react"
import Form from "@/components/Form";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import APIConnect from "@/components/APIConnect";
import Box from "@mui/material/Box/Box";
import { useSession } from "next-auth/react";

const WritingPage:NextPage = () => {
    const {data:session,status} = useSession()
    const [title,setTitle] = useState<string>("")
    const [contents,setContents] = useState<string>("")
    if (status === 'loading') {
        return <div>Loading...</div>;
      }
      else if(session){
        const Create = async () => {
            await APIConnect("http://localhost:3000/api/db/PostCreate",{title:title,content:contents,published:true,user_id:session.user.email})
            await Router.push(`/`)
        }
        return (
        <>
        <Header></Header>
        <Grid container spacing={10} direction="column"
        justifyContent="center"
        alignItems="center"> 
        <Grid item xs={6} md={8}>
        <Form title="タイトル" default="" setWord={setTitle}/>
        </Grid>
        <Grid item xs={6} md={8}>
        <Box sx={{
                width: {
                xs: 500, // theme.breakpoints.up('xs')
                sm: 200, // theme.breakpoints.up('sm')
                md: 300, // theme.breakpoints.up('md')
                lg: 400, // theme.breakpoints.up('lg')
                xl: 700, // theme.breakpoints.up('xl')
                },
                height: (theme) => theme.spacing(40)
            }}>
        <MarkDownEditor default="..." setMarkdown={setContents}/>
        </Box>
        </Grid>
        {/* </Grid>
        <Grid container spacing={10} direction="column"
        justifyContent="flex-end"
        alignItems="center">  */}
        <Grid item xs={6} md={8}>
        <Button variant="contained" 
            onClick={() => Create()}>
            新規作成</Button>
        </Grid>
        </Grid>
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