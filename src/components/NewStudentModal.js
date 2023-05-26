import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


const NewStudentModal = ({ open, onClose, onSubmit }) => {
    const [newStudentrData, setNewStudentData] = useState({
        name: '',
        firstLastName: '',
        email: '',
        secondLastName: '',
    });
    const [formErrors, setFormErrors] = useState({
        nameError: '',
        firstLastNameError: '',
        secondLastNameError: '',
        emailError: ''

    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Validar los campos antes de enviar el formulario
        if (!newStudentrData.name) {
            setFormErrors((prevErrors) => ({ ...prevErrors, nameError: 'Name is required' }));
            return;
        }
        if (!newStudentrData.email) {
            setFormErrors((prevErrors) => ({ ...prevErrors, emailError: 'Email is required' }));
            return;
        }
        if (!newStudentrData.firstLastName) {
            setFormErrors((prevErrors) => ({ ...prevErrors, firstLastNameError: 'Product is required' }));
            return;
        }
        if (!newStudentrData.secondLastName) {
            setFormErrors((prevErrors) => ({ ...prevErrors, secondLastNameError: 'Phone is required' }));
            return;
        }

        // Limpiar los errores de validación
        setFormErrors({ nameError: '', emailError: '' });
        onSubmit(newStudentrData);
        setNewStudentData({
            name: '',
            firstLastName: '',
            email: '',
            secondLastName: '',
        });
    };

    const handleFormInputChange = (e) => {
        setNewStudentData({ ...newStudentrData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                    Create new Student
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newStudentrData.name}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.nameError)}
                            helperText={formErrors.nameError}
                        />
                       
                        <TextField
                            label="First Last Name"
                            name="firstLastName"
                            value={newStudentrData.firstLastName}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.firstLastNameError)}
                            helperText={formErrors.firstLastNameError}
                        />
                        <TextField
                            label="Second LastName"
                            name="secondLastName"
                            value={newStudentrData.secondLastName}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.secondLastNameError)}
                            helperText={formErrors.secondLastNameError}
                        />
                         <TextField
                            label="Email"
                            name="email"
                            value={newStudentrData.email}
                            onChange={handleFormInputChange}
                            fullWidth
                            required
                            error={Boolean(formErrors.emailError)}
                            helperText={formErrors.emailError}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleFormSubmit}>
                        save
                    </Button>
                    <Button autoFocus onClick={onClose}>
                        cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default NewStudentModal;
