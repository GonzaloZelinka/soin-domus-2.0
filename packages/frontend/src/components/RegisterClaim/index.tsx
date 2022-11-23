import React, { useEffect, useState } from 'react'
import { IPropiedad, I_Inquilino } from 'shared-common'
import {
  ReclamoFrontEnd as Reclamo,
  PropiedadFrontEnd as Propiedad,
} from '../../helpers/communications'
import { CardHeader, makeStyles } from 'material-ui-core'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
interface Props {
  inquilino: I_Inquilino
  propiedad: IPropiedad
}
const useStyles = makeStyles({
  mainBox: {
    paddingTop: '120px',
    height: '85%',
    width: '90%',
  },
  main :{
    backgroundColor: 'lightGrey',
    height: '130%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const RegisterClaim = ({ inquilino, propiedad }: Props) => {
  const classes = useStyles()
  const [expandedProp, setExpandedProp] = useState(false)
  const [expandedInquilino, setExpandedInquilino] = useState(false)
  const [claimInfo, setClaimInfo] = useState({
    prioridad: '',
    atencionRequerida: '',
    reclamante: '',
    descripcion: '',
  })
  const [claimDateStart, setClaimDateStart] = React.useState<Date | null>(null)
  const [isDisabled, setDisabled] = useState(true)
  const [errorSearch, setErrorSearch] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [idReclamo, setIdReclamo] = useState('')
  const handleSend = async () => {
    try {
      const date = new Date()

      if (claimDateStart !== null && propiedad._id !== undefined) {
        await Reclamo.setReclamo({
          ...claimInfo,
          propiedad: propiedad._id,
          inicioInconveniente: claimDateStart,
          fechaReclamo: date,
        })
          .then(response => setIdReclamo(response.output._id))
          .catch(error => console.error(error))
        await Propiedad.añadirReclamo({ reclamo: idReclamo, propiedad: propiedad._id }).catch(
          error => console.error(error),
        )
      }
    } catch (e) {
      setErrorSearch(true)
      setDisabled(true)
    }
  }
  useEffect(() => {
    const isNotCompleted = Object.values(claimInfo).some(e => e === '')
    if (isNotCompleted || claimDateStart === null) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [claimInfo, claimDateStart])
  return (
<div className={classes.main}>
      <Box className={classes.mainBox}>
        <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm container direction="row" spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="DESCRIPCION PROPIEDAD" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={3}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        Direccion
                      </Typography>
                      <Typography>{`${propiedad.calle_dir} ${propiedad.nro_dir}`}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        Localidad
                      </Typography>
                      <Typography>{propiedad.localidad}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        Tamaño(m2)
                      </Typography>
                      <Typography>{propiedad.area}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        Pisos
                      </Typography>
                      <Typography>{propiedad.pisos}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-expanded={expandedProp}
                    //   expand={expandedProp}
                    onClick={() => {
                      setExpandedProp(!expandedProp)
                    }}
                    aria-label="show more"
                    sx={{
                      transform: !expandedProp ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expandedProp} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <Typography className={classes.type} sx={{ fontSize: 14 }}>
                          Descripcion
                        </Typography>
                        <Typography>{propiedad.descripcion}</Typography>
                      </Grid>
                      <Grid item container direction="row" xs={12}>
                        <Grid item xs={6}>
                          <Typography className={classes.type} sx={{ fontSize: 14 }}>
                            ID propiedad
                          </Typography>
                          <Typography>{propiedad._id}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography className={classes.type} sx={{ fontSize: 14 }}>
                            Cantidad de Habitaciones
                          </Typography>
                          <Typography>{propiedad.cant_hab}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography className={classes.type} sx={{ fontSize: 14 }}>
                            Cantidad de Baños
                          </Typography>
                          <Typography>{propiedad.cant_bathroom}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="DESCRIPCION CLIENTE" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={6}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        Inquilino
                      </Typography>
                      <Typography>{`${inquilino.nombre} ${inquilino.apellido}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.type} sx={{ fontSize: 14 }}>
                        DNI
                      </Typography>
                      <Typography>{inquilino.dni}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-expanded={expandedProp}
                    onClick={() => {
                      setExpandedInquilino(!expandedInquilino)
                    }}
                    aria-label="show more"
                    sx={{
                      transform: !expandedInquilino ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expandedInquilino} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={6}>
                        <Typography className={classes.type} sx={{ fontSize: 14 }}>
                          Telefono
                        </Typography>
                        <Typography>{`+54${inquilino.telefono}`}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={classes.type} sx={{ fontSize: 14 }}>
                          Email
                        </Typography>
                        <Typography>{inquilino.email}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="RECLAMO" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="outlined"
                        label="Descripcion del Reclamo"
                        fullWidth
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setClaimInfo({ ...claimInfo, descripcion: event.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container direction="row" spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="PRIORIDAD" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="">Seleccione una prioridad del reclamo</InputLabel>
                        <Select
                          id="prioridad-select"
                          variant="outlined"
                          fullWidth
                          value={claimInfo.prioridad}
                          label="Seleccione una prioridad del reclamo"
                          onChange={(event: SelectChangeEvent) =>
                            setClaimInfo({ ...claimInfo, prioridad: event.target.value })
                          }
                        >
                          <MenuItem value={10}>Alta</MenuItem>
                          <MenuItem value={5}>Media</MenuItem>
                          <MenuItem value={2}>Baja</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="TIPO" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="tipo-select">Seleccione un tipo de reclamo</InputLabel>
                        <Select
                          id="tipo-select"
                          variant="outlined"
                          fullWidth
                          value={claimInfo.atencionRequerida}
                          label="Seleccione un tipo de reclamo"
                          onChange={(event: SelectChangeEvent) =>
                            setClaimInfo({ ...claimInfo, atencionRequerida: event.target.value })
                          }
                        >
                          <MenuItem value="Problema eléctrico">Problema eléctrico</MenuItem>
                          <MenuItem value="Problema en el suministro de agua">
                            Problema en el suministro de agua
                          </MenuItem>
                          <MenuItem value="Otro">Otro</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container direction="row" spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="FECHA INICIO" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Seleccione la fecha en que comenzo a suceder el inconveniente"
                          value={claimDateStart}
                          disableFuture
                          onChange={(newValue: Date | null) => {
                            if (newValue !== null && newValue <= new Date()) {
                              setClaimDateStart(newValue)
                            }
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              inputProps={{ ...params.inputProps, readOnly: true }}
                              fullWidth
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="REMITENTE" />
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="remitente-select">
                          Seleccione el remitente del reclamo
                        </InputLabel>
                        <Select
                          id="remitente-select"
                          variant="outlined"
                          fullWidth
                          value={claimInfo.reclamante}
                          label="Seleccione el remitente del reclamo"
                          onChange={(event: SelectChangeEvent) =>
                            setClaimInfo({ ...claimInfo, reclamante: event.target.value })
                          }
                        >
                          <MenuItem value="Dueño">Dueño</MenuItem>
                          <MenuItem value="Inquilino">Inquilino</MenuItem>
                          <MenuItem value="Agente Inmobiliario">Agente Inmobiliario</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container direction="row" spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                disabled={isDisabled}
                variant="contained"
                onClick={() => {
                  handleSend()
                    .then(() => {
                      setOpenSnackbar(true)
                    })
                    .catch(error => {
                      console.error(error)
                      setDisabled(true)
                      setErrorSearch(true)
                      setOpenSnackbar(true)
                    })
                }}
              >
                REGISTRAR RECLAMO
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
                {errorSearch ? (
                  <Alert
                    onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
                      if (reason === 'clickaway') {
                        return
                      }
                      setOpenSnackbar(false)
                    }}
                    severity="error"
                    variant="filled"
                  >
                    Ocurrio un Error - Vuelva a intentarlo!
                  </Alert>
                ) : (
                  <Alert
                    onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
                      if (reason === 'clickaway') {
                        return
                      }
                      setOpenSnackbar(false)
                    }}
                    severity="success"
                    variant="filled"
                  >
                    Reclamo Creado!
                  </Alert>
                )}
              </Snackbar>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default RegisterClaim
