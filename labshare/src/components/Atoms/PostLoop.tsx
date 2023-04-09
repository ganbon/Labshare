import React from 'react'
import Link from 'next/link'
import UserPropsType from '@/types/UserProps'

// 引数の型、スレッドカードを要素とした配列
type ResultPropsType = {
    threadlist:UserPropsType[];
    host:string
}

// スレッドをループ処理によって複数表示する。
const PostLoop : React.FC<any> = React.memo(({postlist}) => {
    return(
      <>
      {postlist.map((result) => { 
        return(
            <>
            <Link 
            href={{pathname:`/post/${result.id}`}}>
                <div>{result.title}</div>
            </Link>
            </>
        );
    })}
    </>
    )
}) 

export default PostLoop