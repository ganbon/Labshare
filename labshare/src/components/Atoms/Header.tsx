import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login';
import MenuButton from './MenuButton';
import PersistentDrawerLeft from './PersistentDrawerLeft';
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
    const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" open={open}>
        <Toolbar>
         <MenuButton open={open} setOpen={setOpen} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lab Share
          </Typography>
          <Login/>
        </Toolbar>
      </AppBar>
      <PersistentDrawerLeft open={open} setOpen={setOpen}/>
    </Box>
  );
}

export default Header