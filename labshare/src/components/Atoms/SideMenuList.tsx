import React from 'react';
import { List,ListItem,ListItemText } from '@mui/material';
import Link from 'next/link';

const SideMenuList = () => {
  const menulist = ["ホーム","プロフィール","新規作成"]
  const menupath = ["/","/user","/writing"]
  return (
    <>
      <List>
        {menulist.map((text, index) => (
          <Link href={menupath[index]}>
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
export default SideMenuList