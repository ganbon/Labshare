import PassForm from "@/components/PassForm";
import {useState,} from "react";
import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
  } from 'next'
import Router from 'next/router'
import APIConnect from "@/components/APIConnect";
import { Button } from "@mui/material";
import Head from "next/head";
import { useSession } from "next-auth/react";

const PassWordEditPage:NextPage<any> = ({id}) => {
  const {data:session,status} = useSession()
    const [password,setPassword] = useState<string>("")
    const Edit = async () => {
        const result = await APIConnect(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/db/PassWordUpdate`,{id:id,password:password})
        await Router.push(`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/${id}`)
    }
    const Cancel = () => {
       Router.push(`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/${id}`)
    }
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    else if(session){
    return (
    <>
    <Head>
  <title>Lab Share</title>
  </Head>
    <h1>パスワード変更</h1>
    {/* <PassForm title="パスワード" default="" setWord={setPassword}/> */}
      <Button variant="contained" 
          onClick={() => Edit()}>
          決定</Button>
      <Button variant="contained" 
          onClick={() => Cancel()}>
          キャンセル</Button>
    </>
    )}else{
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

export const getServerSideProps = async (
    context: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<any>> => {
    // context経由でブラウザから送信されたパラメーターを受け取る
    const id  = context.query.id
    // 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
    return {props:{id}}
    }
    
export default PassWordEditPage