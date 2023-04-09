import type { NextPage } from 'next'
import Header from '@/components/Atoms/Header';
import ProfileLoop from '@/components/Atoms/ProfileLoop';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from "next";
import UserPropsType from '@/types/UserProps';
import APIConnect from "@/components/Atoms/APIConnect";


export default function Home(response:UserPropsType[]) {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(!session){
  return (
  <>
  <Header></Header>
  </>
  )}else{
    const now = new Date()
    const year = Number(now.getFullYear().toString().slice(-2))

      return (
          <>
          <Header></Header>
          <h2>在学生</h2>
          
          <h2>卒業生</h2>
          <ProfileLoop profilelist={response}/>
          </>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const search_user = {number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string}
  const create_user = {name:process.env.NEXT_PUBLIC_ADMIN_USER as string,
                      number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string,
                      password:process.env.NEXT_PUBLIC_ADMIN_PASS as string}
  const user_data = await APIConnect("http://localhost:3000/api/db/UserSearch", search_user);
  if (user_data == null) {
      const message = await APIConnect("http://localhost:3000/api/db/UserCreate", create_user);
  }
  const response:UserPropsType[] = await APIConnect("http://localhost:3000/api/db/UserSearchAll",{test:"test"})
  return {props:{response}}
}