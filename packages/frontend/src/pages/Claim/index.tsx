import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from 'material-ui-core'
import ClaimTable from '../../components/ClaimTable'
import { getInfoProperty } from '../../helpers/communications'
import SyncQueryParams from '../../components/SyncQueryParams/SyncQueryParams'
import { IParams, IPropiedad } from 'shared-common'
import { join } from 'lodash'
import { useLocation } from 'react-router-dom'
const useStyles = makeStyles({
  title: {
    paddingTop: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainGrid: {
    height: '100vh',
    width: '50vw',
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
    height: '100vh',
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
  const [errorSearch, setErrorSearch] = useState({ inquilino: false, property: false })
  const [resultsQuery, setResultsQuery] = useState<object[]>([])
  const [globalParams, setGlobalParams] = useState<IParams>(INITIAL_PARAMS)
  const { search } = useLocation()
  const handleSearch = async () => {
    let PropInq: IPropiedad[]
    if (property !== '') {
      try {
        PropInq = await getInfoProperty(property, 'property')
        console.log('PROPIEDADES ', PropInq)
        setResultsQuery(PropInq)
        const nroPropInq = PropInq.map(e => e.inquilino)
        setGlobalParams({ properties: join(nroPropInq, '-') })
      } catch (e) {
        console.error(e)
        setErrorSearch({ inquilino: true, property: false })
      }
    } else {
      try {
        PropInq = await getInfoProperty(inquilino, 'inquilino')
        setResultsQuery(PropInq)
        console.log('INQUILINO ', PropInq)
        if (PropInq[0].inquilino !== undefined) {
          setGlobalParams({ inquilino: `${(PropInq[0].inquilino ?? '')}` })
        }
      } catch (e) {
        console.error(e)
        setErrorSearch({ inquilino: false, property: true })
      }
    }
    if (!(errorSearch.inquilino && errorSearch.property)) {
      setIsSearch(true)
    }
  }
  const classes = useStyles()
  return (
    <div className={classes.mainApp}>
      <SyncQueryParams initialParams={globalParams} />
      {isSearch && search !== null ? (
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
                error={errorSearch.property}
                helperText={errorSearch.property && 'Direccion Incorrecto'}
                fullWidth
                label="DIRECCION DE PROPIEDAD"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setProperty(event.target.value)
                }
              />
            </Grid>
            <Grid item className={classes.input}>
              <TextField
                error={errorSearch.inquilino}
                helperText={errorSearch.inquilino && 'DNI Incorrecto'}
                type="number"
                fullWidth
                label="DNI INQUILINO"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInquilino(event.target.value)
                  console.log('INQUILINO ', event.target.value)
                }}
              />
            </Grid>
            <Grid item className={classes.input}>
              <Button
                variant="contained"
                fullWidth
                className={classes.mainButton}
                onClick={() => {
                  handleSearch().catch(error => {
                    console.error(error)
                    setIsSearch(false)
                  })
                }}
              >
                BUSCAR
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </div>
  )
}

export default Claim
