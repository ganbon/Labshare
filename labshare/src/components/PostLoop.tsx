import React from 'react'
import Link from 'next/link'
import PostPropsType from '@/types/PostProps'


const PostLoop : React.FC<{postlist:PostPropsType[]}> = React.memo(({postlist}) => {
    return(
      <>
      {postlist.map((result) => { 
        return(
            <>
            <Link 
            href={{pathname:`${process.env.NEXT_PUBLIC_ROOTPATH}/post/${result.id}`}} legacyBehavior>
                <a style={{ textDecoration: 'none' }}><h4>{result.title}</h4></a>
            </Link>
            </>
        );
    })}
    </>
    )
}) 

export default PostLoop