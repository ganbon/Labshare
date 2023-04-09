import type { NextPage } from "next";
import LinkLoop from "../Atoms/ProfileLoop";
import APIConnect from "../Atoms/APIConnect";
import {useSession} from 'next-auth/react'
import Header from "../Atoms/Header"
import { GetServerSideProps } from "next";

const HomeTemplate:NextPage<any> = ({response}) => {
    // console.log(response)
    
    const { data: session, status } = useSession()
    if(!session){
    return (
    <>
    <Header></Header>
    </>
    )}else{
        return (
            <>
            <Header></Header>
            <LinkLoop threadlist={response}/>
            </>
        )
    }
}
    
export default HomeTemplate

export const getServerSideProps: GetServerSideProps = async () => {
    const search_user = {number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string}
    const create_user = {name:process.env.NEXT_PUBLIC_ADMIN_USER as string,
                        number:process.env.NEXT_PUBLIC_ADMIN_NUMBER as string,
                        password:process.env.NEXT_PUBLIC_ADMIN_PASS as string}
    console.log(search_user)
    console.log(create_user)
    const user_data = await APIConnect("http://localhost:3000/api/db/UserSearch", search_user);
    if (user_data == null) {
        const message = await APIConnect("http://localhost:3000/api/db/CreateUser", create_user);
    }
    const response = await APIConnect("http://localhost:3000/api/db/UserSearchAll",{test:"test"})
    return {props:{response}}
};
