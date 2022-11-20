import React from 'react'
import { I_Inquilino } from 'shared-common'
import { makeStyles } from 'material-ui-core'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

interface Props {
  inquilino: I_Inquilino | undefined
}
const useStyles = makeStyles({
  mainBox: {
    paddingTop: '100px',
    height: '80vh',
    width: '90vw',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid black',
    flexGrow: 1,
  },
})
const RegisterClaim = ({ inquilino }: Props) => {
  const classes = useStyles()

  return (
    <Box className={classes.mainBox}>
      <Grid container spacing={5} rowSpacing={5}>
        <Grid item xs={6} border="1px solid green"></Grid>
        <Grid item xs={6} border="1px solid red">
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Inquilino
              </Typography>
              <Typography>
                `${inquilino?.nombre} ${inquilino?.apellido}`
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} border="1px solid red"></Grid>
        <Grid item xs={4} border="1px solid green"></Grid>
        <Grid item xs={4} border="1px solid red"></Grid>
        <Grid item xs={4} border="1px solid red"></Grid>
        <Grid item xs={4} border="1px solid green"></Grid>
        <Grid item xs={4} border="1px solid red"></Grid>
        <Grid item xs={4} border="1px solid red"></Grid>
      </Grid>
    </Box>
  )
}

export default RegisterClaim
