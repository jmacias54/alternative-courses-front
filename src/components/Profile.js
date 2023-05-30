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
import renderOptionsCell from '../utils/RenderOptionsCell';
import students_services from '../services/students-service';
import NewStudentModal from './NewStudentModal';
import CustomSnackbar from '../utils/CustomSnackbar';
import StudentDetail from '../components/StudentDetail';


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

export default function Profile() {
  const classes = useStyles();
  const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = localStorage.getItem('user');
  const userJSON = JSON.parse(user); // Parsea el valor almacenado en localStorage a un objeto o una matriz
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [studentId, setStudentId] = useState(0);

  
  const [openModalNewStudet, setOpenModalNewStudet] = useState(false);
  const [openModalStudentDetail, setOpenModalStudentDetail] = useState(false);


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'firstLastName', headerName: 'First Last Name', width: 100 },
    { field: 'secondLastName', headerName: 'Second Last Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => renderOptionsCell(params, fetchData,handleStudentDetail), // Pasar fetchData como prop
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await students_services.getAll();
      const formattedData = response.map((row) => ({
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


  const handleCreateNewStudent = () => {
    setOpenModalNewStudet(true);
  };

  const handleStudentDetail = (studentId) => {
    console.log("---handleStudentDetail---",studentId)
    setStudentId(studentId);
    setOpenModalStudentDetail(true);

  };

  const handleStudentDetailClose = () => {
    console.log("---handleStudentDetailClose---")
    setOpenModalStudentDetail(false);
  };

  const handleNewStudentClose = () => {
    setOpenModalNewStudet(false);
  };


  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    isCustomSnackbarOpen(false);
    setAlertMessage("");
    setAlertSeverity("");
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

  const handleFormNewStudentSubmit = async (newStudentData) => {
    console.log(newStudentData)
    try {
      const response = await students_services.create(newStudentData);
      console.log('New Student is created:', response.data);
      setOpenModal(false);
      isCustomSnackbarOpen(true);
      setAlertMessage("New Student is created");
      setAlertSeverity("success");
      fetchData();
    } catch (error) {
      console.error('Error to create new Student:', error);
      isCustomSnackbarOpen(true);
      setAlertMessage("Error to create new Student:" + error);
      setAlertSeverity("warning");
    }
    setOpenModal(false);
    handleNewStudentClose();

  };


  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button variant="contained" color="primary" onClick={handleCreateNewStudent}>
          New User
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
      <Card variant="outlined">
        <CardContent>
          <Person className={classes.large} />
          <Typography variant="h5">
            Welcome {userJSON.username}
          </Typography>
          <>
            <div className="datagrid-container" style={{ height: 500, width: '50%' }}>
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
        </CardContent>
      </Card>


      <NewStudentModal open={openModalNewStudet} onClose={handleNewStudentClose} onSubmit={handleFormNewStudentSubmit} />
      <StudentDetail open={openModalStudentDetail} onClose={handleStudentDetailClose} studentId={studentId} />

      <CustomSnackbar
        message={alertMessage}
        severity={alertSeverity}
        open={customSnackbarOpen}
        handleClose={handleAlertClose}
      />
    </div>
  );
}