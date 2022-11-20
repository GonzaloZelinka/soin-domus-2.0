import React, { useState } from 'react'
import { Box, makeStyles } from 'material-ui-core'
import { DataGrid, GridEnrichedColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { IParams } from 'shared-common'
import RegisterClaim from '../RegisterClaim'
import SyncQueryParams from '../SyncQueryParams/SyncQueryParams'
import { useLocation } from 'react-router-dom'
const useStyles = makeStyles({
  boxDataGrid: {
    paddingTop: '100px',
    height: '80vh',
    width: '90vw',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  mainApp: {
    backgroundColor: 'lightGrey',
  },
  selecButton: {
    background: 'linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)',
  },
})

interface Props {
  rows: object[]
}
const ClaimTable = ({ rows }: Props) => {
  const { search } = useLocation()
  const classes = useStyles()
  const [openRegisterClaim, setOpenRegisterClaim] = useState(false)
  const [infoClaim, setInfoClaim] = useState<IParams>({ properties: '', inquilino: '' })
  const columns: GridEnrichedColDef[] = [
    {
      field: '_id',
      headerName: 'ID',
      width: 150,
      flex: 0.75,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'calle_dir',
      flex: 0.75,
      headerName: 'DIRECCION',
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'nro_dir',
      headerName: 'NUMERO',
      flex: 0.5,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'localidad',
      headerName: 'LOCALIDAD',
      flex: 0.75,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'area',
      headerName: 'TAMAÑO (m2)',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      editable: false,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      flex: 1.5,
      headerAlign: 'center',
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Button
          size="small"
          className={classes.selecButton}
          key={params.id}
          variant="contained"
          onClick={() => {
            setOpenRegisterClaim(true)
            setInfoClaim({ properties: params.row._id, inquilino: params.row.inquilino })
            console.log({ properties: params.row._id, inquilino: params.row.inquilino })
          }}
        >
          Selecionar
        </Button>
      ),
    },
  ]

  return (
    <>
      <SyncQueryParams initialParams={infoClaim}></SyncQueryParams>
      {openRegisterClaim ? (
        <RegisterClaim refInfo={infoClaim} />
      ) : (
        <Box className={classes.boxDataGrid}>
          <DataGrid
            getRowId={row => row._id}
            rows={rows}
            columns={columns}
            sx={{
              boxShadow: 2,
              border: 1,
              backgroundColor: 'white',
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'lightGrey',
              },
              '& .MuiDataGrid-iconSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                borderRight: '1px solid black',
                borderBottom: '1px solid black',
              },
              '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: '1px solid black',
              },
            }}
          />
        </Box>
      )}
    </>
  )
}
export default ClaimTable
