import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from './CustomSnackbar';
import React, { useState } from 'react';
import students_services from '../services/students-service';
import StudentDetail from '../components/StudentDetail';


const RenderOptionsCell = (params, fetchData) => {
    const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");


    const handleDelete = async () => {
        // Lógica para eliminar el registro
        try {
            const response = await students_services.deleteStudent(params.row.id);
            console.log('Registro eliminado:', response.data);
            isCustomSnackbarOpen(true);
            setAlertMessage("Exito eliminar el registro:");
            setAlertSeverity("success");
            fetchData(); // Actualizar los datos después de eliminar el registro
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
            isCustomSnackbarOpen(true);
            setAlertMessage("Error al eliminar el registro:" + error);
            setAlertSeverity("warning");
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        isCustomSnackbarOpen(false);
        setAlertMessage("");
        setAlertSeverity("");
    };

    const handleDetail = (event, reason) => {
     
    };


    return (
        <div>
            <Button onClick={handleDelete} color="error">
                <DeleteIcon />
            </Button>
            <Button onClick={handleDetail} color="error">
                <DeleteIcon />
            </Button>
            <CustomSnackbar
                message={alertMessage}
                severity={alertSeverity}
                open={customSnackbarOpen}
                handleClose={handleAlertClose}
            />
        </div>
    );
};

export default RenderOptionsCell;
