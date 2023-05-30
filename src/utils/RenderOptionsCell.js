import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CustomSnackbar from './CustomSnackbar';
import students_services from '../services/students-service';
import React, { useState, useEffect } from 'react';


const RenderOptionsCell = (params,
    fetchData,
    handleStudentDetail
) => {
    const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");
    const [studentId, setStudentId] = useState(null);


    useEffect(() => {
        setStudentId(params.row.id);
      }, [params.row.id]);

      
    const handleDelete = async () => {

        try {
            const response = await students_services.deleteStudent(studentId);
            console.log('Registro eliminado:', response.data);
            isCustomSnackbarOpen(true);
            setAlertMessage("Exito eliminar el registro:");
            setAlertSeverity("success");
            fetchData(); 
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

    const handleDetail = () => {
        console.log("---handleDetail--",studentId)
        handleStudentDetail(studentId)
    };


    return (
        <div>
            <Button onClick={handleDelete} color="error">
                <DeleteIcon />
            </Button>
            <Button onClick={handleDetail} color="primary">
                <AssignmentInd />
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
