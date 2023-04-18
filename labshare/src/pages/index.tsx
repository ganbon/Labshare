import type { NextPage } from 'next'
import Header from '@/components/Header';
import ProfileLoop from '@/components/ProfileLoop';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from "next";
import UserPropsType from '@/types/UserProps';
import {Grid} from '@mui/material';
import APIConnect from "@/components/APIConnect";


export default function Home({response}:{response:UserPropsType[]}) {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if(!session){
  return (
  <>
  <Header></Header>
  </>
  )}
  else{
    const b3 = response.filter((res)=>{
      return res.grade == "B3"
    })
    const b4 = response.filter((res)=>{
      return res.grade == "B4"
    })
    const m1 = response.filter((res)=>{
      return res.grade == "M1"
    })
    const m2 = response.filter((res)=>{
      return res.grade == "M2"
    })
    const grad = response.filter((res)=>{
      return res.grade == "OB"
    })  
      return (
          <>
          <Header></Header>
          <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={8}>
          <h2>在学生</h2>
          </Grid>
          <Grid item xs={8}>
          <h3>M2</h3>
          <ProfileLoop profilelist={m2}/>
          </Grid>
          <Grid item xs={8}>
          <h3>M1</h3>
          <ProfileLoop profilelist={m1}/>
          </Grid>
          <Grid item xs={8}>
          <h3>B4</h3>
          <ProfileLoop profilelist={b4}/>
          </Grid>
          <Grid item xs={8}>
          <h3>B3</h3>
          <ProfileLoop profilelist={b3}/>
          </Grid>
          <Grid item xs={8}>
          <h2>卒業生</h2>
          <ProfileLoop profilelist={grad}/>
          </Grid>
          </Grid>
          </>
      )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const search_user = {number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string}
  const create_user = {name:process.env.NEXT_PUBLIC_ADMIN_USER as string,
                      number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string,
                      grade:process.env.NEXT_PUBLIC_ADMIN_GRADE as string,
                      password:process.env.NEXT_PUBLIC_ADMIN_PASS as string}
  const user_data = await APIConnect("http://localhost:3000/api/db/UserSearch", search_user);
  if (user_data == null) {
      const message = await APIConnect("http://localhost:3000/api/db/UserCreate", create_user);
  }
  const response = await APIConnect("http://localhost:3000/api/db/UserSearchAll",{test:"test"}) as UserPropsType[]
  console.log(typeof response)
  console.log(response)
  return {props:{response}}
}