import React from 'react'
import Link from 'next/link'
import UserPropsType from '@/types/UserProps'   

// スレッドをループ処理によって複数表示する。
const ProfileLoop : React.FC<{profilelist:UserPropsType[]}> = React.memo(({profilelist}) => {
    return(
      <>
      {profilelist.map((result) => { 
        // if(result.student_number !== host){
        return(
            <>
            <a className="no-underline">
            <Link 
            href={{pathname:`/profile/${result.id}`}}>
                <div>{result.name}</div>
            </Link>
            </a>
            </>
        );
        // }
    })}
    </>
    )
}) 

export default ProfileLoop