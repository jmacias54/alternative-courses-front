import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Person from '@mui/icons-material/Person';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import scoresRenderOptionsCell from '../utils/ScoresRenderOptionsCell';
import students_services from '../services/scores-services';

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function StudentDetail(idStudent) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = localStorage.getItem('user');
  const userJSON = JSON.parse(user); // Parsea el valor almacenado en localStorage a un objeto o una matriz
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'subject', headerName: 'subject', width: 200 },
    { field: 'score', headerName: 'Score', width: 200 },
    { field: 'registrationDate', headerName: 'Registration Date', width: 200 },
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => scoresRenderOptionsCell(params, fetchData), // Pasar fetchData como prop
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await students_services.getDetail(idStudent);
      const formattedData = response.scores.map((row) => ({
        id: row.id,
        name: row.name,
        firstLastName: row.firstLastName,
        secondLastName: row.secondLastName,
        email: row.email,
       
      }));
      setData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };


  const handleCreate = () => {
    setOpenModal(true);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          New Score
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Person />
            </IconButton>
            <Menu id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Person className={classes.large} />
          <Typography variant="h5">
            Welcome {userJSON.username}
          </Typography>
        </CardContent>
      </Card>

      <>
        <div style={{ height: 400, width: '90%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            disableSelectionOnClick
            onSelectionModelChange={(selectedRows) => console.log(selectedRows)}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
         
    
        </div>
      </>
    </div>
  );
}