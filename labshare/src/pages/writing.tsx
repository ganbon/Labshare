import type { NextPage } from "next";
import Router from "next/router";
import Header from "@/components/Header";
import MarkDownEditor from "@/components/MarkdownEditer";
import {useState} from "react"
import { styled } from '@mui/material/styles';
import LongForm from "@/components/LongForm";
import { Button,Grid,Box} from "@mui/material";
import APIConnect from "@/components/APIConnect";
import { useSession } from "next-auth/react";
const WritingPage:NextPage = () => {
    // const FixButton = styled(Button)(((theme) => ({
    //       position: 'fixed',
    //       textalign: "center"
    //   })));
    // const FixHeader = styled(Header)(((theme) => ({
    //     position: 'fixed',
    //     textalign: "center"
    // })));
    // const FixForm = styled(LongForm)(((theme) => ({
    //     position: 'fixed',
    //     textalign: "center"
    // })));
    const {data:session,status} = useSession()
    const [title,setTitle] = useState<string>("")
    const [contents,setContents] = useState<string>("")
    if (status === 'loading') {
        return <div>Loading...</div>;
      }
      else if(session){
        const Create = async () => {
            await APIConnect(`/api/db/PostCreate`,{title:title,content:contents,published:true,user_id:session.user.email})
            await Router.push(`/`)
        }
        return (
        <>
        <Header></Header>
        <Grid container justifyContent="flex-end" alignItems="center" spacing={0.5}> 
        <Grid item xs={4} alignItems="center" style={{ padding: 20 }}>
        <LongForm title="タイトル" default="" setWord={setTitle}/>
        </Grid>
        <Grid item xs={4} style={{ padding: 20 }}>
        <Button variant="contained" 
            onClick={() => Create()}>
            新規作成</Button>
        </Grid>
        </Grid>
        <Grid container direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}> 
        <Grid item xs={6} md={8} style={{ padding: 10 }}>
        <Box sx={{
                width: {
                xs: 600, // theme.breakpoints.up('xs')
                sm: 200, // theme.breakpoints.up('sm')
                md: 300, // theme.breakpoints.up('md')
                lg: 400, // theme.breakpoints.up('lg')
                xl: 1200, // theme.breakpoints.up('xl')
                },
                height: (theme) => theme.spacing(40)
            }}>
        <MarkDownEditor default="" setMarkdown={setContents}/>
        </Box>
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