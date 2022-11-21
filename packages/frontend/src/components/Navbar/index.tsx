import { AppBar, Container, Toolbar, Stack, MenuItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { makeStyles } from 'material-ui-core'

const useStyles = makeStyles({
  navbar: {
    background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)',
    height: '80px',
    display: 'flex',
    fontSize: '1.2rem',
  },
  navbarLogo: {
    color: '#fff',
    justifyContent: 'start',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    height: '70px',
  },
  navLinks: {
    color: '#fff',
    padding: '0.5rem 1rem',
    textDecoration: 'inherit',
    '&:hover': {
      borderBottom: '4px solid #fff',
      transition: 'all 0.2s ease-out',
    },
  },
  navMenu: {
    width: '60vw',
    margin: '0 2rem 0 0',
  },
  navItem: {
    height: '80px',
  },
})
const Navbar = () => {
  const classes = useStyles()
  return (
    <AppBar className={classes.navbar}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Stack>
            <img src="/SOIN-DOMUS_LOGO.png" alt="" className={classes.navbarLogo} />
          </Stack>
          <Stack direction={'row'} className={classes.navMenu}>
            <MenuItem key={1} className={classes.navItem}>
              <Link to={'/'} className={classes.navLinks}>
                <Typography>Home</Typography>
              </Link>
            </MenuItem>
            <MenuItem key={2} className={classes.navItem}>
              <Link
                onClick={() => window.location.pathname === '/Reclamo' && window.location.reload()}
                to={`/Reclamo`}
                className={classes.navLinks}
              >
                <Typography>Registrar Reclamo</Typography>
              </Link>
            </MenuItem>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
