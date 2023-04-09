


import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
  } from 'next'
import { useState,useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkDownEditor from '@/components/Atoms/MarkdownEditer';
import Header from '@/components/Atoms/Header'
import Form from '@/components/Atoms/Form';
import { useSession } from 'next-auth/react'
import APIConnect from '@/components/Atoms/APIConnect';

const ProfilePage:NextPage<any> = ({posts}) => {
  const {data:session,status} = useSession()
  const [content,setContents] = useState<string>(posts.content)
  const [title,setTitle] = useState<string>(posts.title)
  if (status === 'loading') {
    return <div>Loading...</div>;
  }else if(session?.user?.email==posts.authorId){
    useEffect(() => {
      (async() => {
        await APIConnect("http://localhost:3000/api/db/PostUpdate",{id:posts.id,title:title,content:content})
      })()
    },[title,content])
    return(
    <>
    <Header></Header>
    <Form title="タイトル" default={title} setWord={setTitle}/>
    <div>作成日{posts.createAt}</div>
    <div>更新日{posts.updateAt}</div>
    <MarkDownEditor default={content} setMarkdown={setContents}/>
    </>
    )
  }else{
    return (
      <>
      <Header></Header>
      <h3>{title}</h3>
    <div>作成日{posts.createAt}</div>
    <div>更新日{posts.updateAt}</div>
    <ReactMarkdown>{content}</ReactMarkdown>
      </>
    )
  }
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  // context経由でブラウザから送信されたパラメーターを受け取る
  const post_id  = context.query.id
  // 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
  if (typeof post_id !== 'string') {
    return { notFound: true }
  }else{
    const posts = await APIConnect("http://localhost:3000/api/db/PostSearch",{id:post_id})
    console.log(posts)
    return { props: {posts} }
  }
}

export default ProfilePage