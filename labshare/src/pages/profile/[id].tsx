import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next'
import APIConnect from '@/components/APIConnect'
import Header from '@/components/Header'
import PostLoop from '@/components/PostLoop'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'

const ProfilePage:NextPage<any> = ({user_profile}) => {

const {data:session,status} = useSession()
if (status === 'loading') {
  return <div>Loading...</div>;
}else if(session?.user?.email==user_profile.id){

  return(
  <>
  <Head>
<title>Lab Share</title>
</Head>
  <Header></Header>
  <Link
  href={{pathname:`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/edit`,query:{id:user_profile.id,
                                        name:user_profile.name,
                                        number:user_profile.student_number,
                                        grade:user_profile.grade,
                                        abstract:user_profile.profile.abstract}}}>
              <div>プロフィール編集</div>
  </Link>
  {/* <Link
  href={{pathname:`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/passedit`,query:{id:user_profile.id}}}>
              <div>パスワード変更</div>
  </Link> */}
    <h3>名前</h3>
    <div>{user_profile.name}</div>
    <h3>学年</h3>
    <div>{user_profile.grade}</div>
    <h3>学籍番号</h3>
    <div>{user_profile.student_number}</div>
    <h3>研究概要</h3>
    <div>{user_profile.profile.abstract.split('\n').map(x => (<div>{x}</div>))}</div>
    <h3>記録一覧</h3>
    <PostLoop postlist = {user_profile.posts}/> 
  </>
  )
}else{
  return (
    <>
    <Header></Header>
    <h3>名前</h3>
    <div>{user_profile.name}</div>
    <h3>学年</h3>
    <div>{user_profile.grade}</div>
    <h3>学籍番号</h3>
    <div>{user_profile.student_number}</div>
    <h3>研究概要</h3>
    <div>{user_profile.profile.abstract.split('\n').map(x => (<div>{x}</div>))}</div>
    <h3>記録一覧</h3>
    <PostLoop postlist = {user_profile.posts}/> 
    </>
  )
}
}
export const getServerSideProps = async (
context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
// context経由でブラウザから送信されたパラメーターを受け取る
const userid  = context.query.id
// 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
if (typeof userid !== 'string') {
  return { notFound: true }
}else{
  const user_profile = await APIConnect(`${process.env.HOST_URL}/api/db/ProfileSearch`,{id:userid})
  console.log(user_profile)
  return { props: {user_profile} }
}
}

export default ProfilePage