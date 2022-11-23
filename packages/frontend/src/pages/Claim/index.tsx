import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from 'material-ui-core'
import ClaimTable from '../../components/ClaimTable'
import { PropiedadFrontEnd as Propiedad } from '../../helpers/communications'
import SyncQueryParams from '../../components/SyncQueryParams/SyncQueryParams'
import { IParams, IPropiedad } from 'shared-common'
import { join } from 'lodash'
const useStyles = makeStyles({
  title: {
    paddingTop: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainGrid: {
    height: '100%',
    backgroundColor: 'lightGrey',
    width: '50%',
    paddingTop: '5%',
  },
  input: {
    padding: '1%',
    width: '500px',
  },
  mainButton: {
    background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)',
  },
  mainApp: {
    backgroundColor: 'lightGrey',
    height: '75vh',
    width: '100vw',
  },
})
const INITIAL_PARAMS: IParams = Object.freeze({
  calle_dir: '',
  inquilino: '',
})
const Claim = () => {
  const [isSearch, setIsSearch] = useState(false)
  const [property, setProperty] = useState('')
  const [inquilino, setInquilino] = useState('')
  const [resultsQuery, setResultsQuery] = useState<object[]>([])
  const [globalParams, setGlobalParams] = useState<IParams>(INITIAL_PARAMS)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSearch = async () => {
    let PropInq: IPropiedad[]
    if (property !== '') {
      try {
        PropInq = await Propiedad.getInfoProperty(property, 'property')
        setResultsQuery(PropInq)
        setIsSearch(true)
        const nroPropInq = PropInq.map(e => e.inquilino)
        setGlobalParams({ properties: join(nroPropInq, '-') })
      } catch (e) {
        setIsSearch(false)
        setOpenSnackbar(true)
      }
    } else {
      try {
        PropInq = await Propiedad.getInfoProperty(inquilino, 'inquilino')
        setResultsQuery(PropInq)
        setIsSearch(true)
        if (PropInq[0].inquilino !== undefined) {
          setGlobalParams({ inquilino: `${PropInq[0].inquilino ?? ''}` })
        }
      } catch (e) {
        setIsSearch(false)
        setOpenSnackbar(true)
      }
    }
  }
  const classes = useStyles()
  return (
    <div className={classes.mainApp}>
      <SyncQueryParams initialParams={globalParams} />
      {isSearch ? (
        <ClaimTable rows={resultsQuery} />
      ) : (
        <React.Fragment>
          <Box>
            <Typography variant="h3" className={classes.title}>
              REGISTRAR RECLAMO
            </Typography>
          </Box>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            className={classes.mainGrid}
          >
            <Grid item></Grid>
            <Grid item className={classes.input}>
              <TextField
                fullWidth
                label="DIRECCION DE PROPIEDAD"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setProperty(event.target.value)
                }
              />
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                type="number"
                fullWidth
                label="DNI INQUILINO"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInquilino(event.target.value)
                }}
              />
            </Grid>
            <Grid item className={classes.input}>
              <Button
                variant="contained"
                fullWidth
                className={classes.mainButton}
                onClick={() => {
                  handleSearch().catch(() => {
                    setIsSearch(true)
                    setOpenSnackbar(true)
                  })
                }}
              >
                BUSCAR
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
                  if (reason === 'clickaway') {
                    return
                  }
                  setOpenSnackbar(false)
                }}
              >
                <Alert
                  onClose={(_event?: React.SyntheticEvent | Event, reason?: string) => {
                    if (reason === 'clickaway') {
                      return
                    }
                    setOpenSnackbar(false)
                  }}
                  severity="error"
                  variant="filled"
                >
                  No encontramos coincidencias
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  )
}

export default Claim
