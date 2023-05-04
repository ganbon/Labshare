import Form from "@/components/Form";
import {TextField,styled} from "@mui/material"
import {useState,} from "react";
import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
  } from 'next'
import Router from 'next/router'
import APIConnect from "@/components/APIConnect";
import { Button } from "@mui/material";
import SelectGrade from "@/components/Selectgrad";
import Head from "next/head";

const TextForm = styled(TextField)((({ theme })  => ({
    textContent: {
      whiteSpace: "pre-line",
    }
  })));

const ProfileEditPage:NextPage<any> = ({id,profile_name,profile_number,profile_grade,profile_abstract}) => {
    const [name,setName] = useState<string>(profile_name)
    const [number,setNumber] = useState<string>(profile_number)
    const [grade,setGrade] = useState<string>(profile_grade)
    const [abstract,setAbstract] = useState<string>(profile_abstract)
    const Edit = async () => {
        const result = await APIConnect(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/db/ProfileUpdate`,{id:id,name:name,number:number,grade:grade,abstract:abstract})
        await Router.push(`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/${id}`)
    }
    const Cancel = () => {
       Router.push(`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/${id}`)
    }
    return (
    <>
    <Head>
  <title>Lab Share</title>
  </Head>
    <h1>プロフィール編集</h1>
      <Form title="名前" default={name} setWord={setName}/>
      <Form title="学籍番号" default={number} setWord={setNumber}/>
      <SelectGrade grade={grade} setGrade={setGrade}/>
      <TextForm
        fullWidth
        multiline
        rows={5}
        label="自己紹介"
        onChange={(e) => setAbstract(e.target.value)}
        defaultValue={abstract}
      />
      <Button variant="contained" 
          onClick={() => Edit()}>
          決定</Button>
      <Button variant="contained" 
          onClick={() => Cancel()}>
          キャンセル</Button>
    </>
    )}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<any>> => {
    // context経由でブラウザから送信されたパラメーターを受け取る
    const id  = context.query.id
    const profile_number = context.query.number
    const profile_name = context.query.name
    const profile_grade = context.query.grade
    const profile_abstract = context.query.abstract
    // 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
    return {props:{id,profile_name,profile_number,profile_grade,profile_abstract}}
    }
    
export default ProfileEditPage