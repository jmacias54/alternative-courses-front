import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import subjects_services from "../services/subjects-services";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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

const NewScoreModal = ({ open, onClose, onSubmit, student_id }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [newScoreData, setNewScoreData] = useState({
    studentId: 0,
    subjectId: 0,
    score: 0.0,
    registrationDate: "",
  });
  const [formErrors, setFormErrors] = useState({
    studentIdError: "",
    subjectIdError: "",
    scoreError: "",
    registrationDateError: "",
  });

  const fetchSubjects = async () => {
    try {
      const response = await subjects_services.getAll();
      const formattedSubjects = response.map((row) => ({
        id: row.id,
        name: row.name,
      }));
      setSubjects(formattedSubjects);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("--- ---student_id ----", student_id);

  useEffect(() => {
    console.log("--- useEffect ---student_id ----", student_id);
    setNewScoreData({
      ...newScoreData,
      studentId: student_id, // Aquí asignas el valor deseado para studentId
    });
    fetchSubjects();
  }, [student_id]);

  const handleFormSubmit = (e) => {
    console.log("**handleFormSubmit**", e);
    e.preventDefault();

    console.log("**newScoreData**", newScoreData);

    if (!newScoreData.subjectId) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        subjectIdError: "Subject is required",
      }));
      return;
    }
    if (!newScoreData.score) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        scoreError: "Score is required",
      }));
      return;
    }
    if (!newScoreData.registrationDate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        registrationDateError: "Registration Date is required",
      }));
      return;
    }

    setFormErrors({
      studentIdError: "",
      subjectIdError: "",
      scoreError: "",
      registrationDateError: "",
    });
    onSubmit(newScoreData);

    setNewScoreData({
      ...newScoreData,
      subjectId: 0,
      score: 0.0,
      registrationDate: "",
    });
  };

  const handleFormInputChange = (e) => {
    setNewScoreData({ ...newScoreData, [e.target.name]: e.target.value });
  };

  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
    newScoreData.subjectId = event.target.value;
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          Register new score
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newScoreData.subjectId}
                label="Subject"
                onChange={handleChange}
              >
                <MenuItem value="">Select an option</MenuItem>
                {subjects.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Registration Date"
              name="registrationDate"
              value={newScoreData.registrationDate}
              onChange={handleFormInputChange}
              fullWidth
              required
              error={Boolean(formErrors.registrationDateError)}
              helperText={formErrors.registrationDateError}
            />
            <TextField
              label="Score"
              name="score"
              value={newScoreData.score}
              onChange={handleFormInputChange}
              fullWidth
              required
              error={Boolean(formErrors.scoreError)}
              helperText={formErrors.scoreError}
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

export default NewScoreModal;
