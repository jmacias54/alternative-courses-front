import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { styled } from '@mui/material/styles';
import swal from 'sweetalert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import auth_services from '../services/auth-services';


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


export default function Signin() {
  const [open, isOpen] = useState(true);
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    usernameError: '',
    passwordError: '',
  });

  const signinService = async (username, password) => {

    const response =   await auth_services.register(username, password);   
     
    if ('username' in response && 'id' in response) {
      swal("Success", "the account has been created, please log in", "success", {
        buttons: false,
        timer: 2000,
      })
        .then((value) => {
          window.location.href = "/";
        });
    } else {
      swal("Failed", response.message, "error");
    }
  }

  const onClose = (e) => { }

  const handleFormSubmit = (e) => {
    console.log('handleFormSubmit', e)
    e.preventDefault();
    // Validar los campos antes de enviar el formulario
    if (!data.username) {
      setFormErrors((prevErrors) => ({ ...prevErrors, usernameError: 'username is required' }));
      return;
    }
    if (!data.password) {
      setFormErrors((prevErrors) => ({ ...prevErrors, passwordError: 'password is required' }));
      return;
    }

    signinService(data.username, data.password);
    // Limpiar los errores de validación
    setFormErrors({ usernameError: '', passwordError: '' });
  };

  const handleFormInputChange = (e) => {
    console.log('handleFormInputChange', e)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
          <Avatar>
            <AccessibilityNewIcon style={{ color: 'blue' }} />
          </Avatar>
          Sing Up
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="username"
              value={data.username}
              onChange={handleFormInputChange}
              error={Boolean(formErrors.usernameError)}
              helperText={formErrors.usernameError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={data.password}
              onChange={handleFormInputChange}
              error={Boolean(formErrors.passwordError)}
              helperText={formErrors.passwordError}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormSubmit}>
            Sign Up
          </Button>
          <Link to="/signIn" style={{ textDecoration: 'none' }}>
            <Button autoFocus style={{ color: 'orange' }}>
              Cancel
            </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}