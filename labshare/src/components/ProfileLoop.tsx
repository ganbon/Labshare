import React from 'react'
import Link from 'next/link'
import UserPropsType from '@/types/UserProps'  
import {Grid} from '@mui/material';

// スレッドをループ処理によって複数表示する。
const ProfileLoop : React.FC<{profilelist:UserPropsType[]}> = React.memo(({profilelist}) => {
    return(
      <>
      {profilelist.map((result) => { 
        return(
            <>
            <Grid item xs={8}>
            <a className="no-underline">
           <Link 
            href={{pathname:`${process.env.NEXT_PUBLIC_ROOTPATH}/profile/${result.id}`}} legacyBehavior>
                <a style={{ textDecoration: 'none' }}><h4>・{result.name}</h4></a>
            </Link>
            </a>
            </Grid>
            </>
        );
    })}
    </>
    )
}) 

export default ProfileLoop