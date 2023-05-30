import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import scoresRenderOptionsCell from "../utils/ScoresRenderOptionsCell";
import students_services from "../services/students-service";
import scores_services from "../services/scores-services";

import Person from "@mui/icons-material/Person";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import NewScoreModal from "./NewScoreModal";
import CustomSnackbar from "../utils/CustomSnackbar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentDetail(idStudent) {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState();
  const [openModalNewScore, setOpenModalNewScore] = useState(false);
  const [customSnackbarOpen, isCustomSnackbarOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "subject", headerName: "subject", width: 200 },
    { field: "score", headerName: "Score", width: 200 },
    { field: "registrationDate", headerName: "Registration Date", width: 200 },
    {
      field: "opciones",
      headerName: "Opciones",
      width: 200,
      // renderCell: (params) => scoresRenderOptionsCell(params, fetchData),  Pasar fetchData como prop
    },
  ];

  const fetchData = async () => {
    try {
      console.log("-fetchData-idStudent--", idStudent.studentId);
      const response = await students_services.getDetail(idStudent.studentId);
      const formattedData = response.scores.map((row) => ({
        id: row.id,
        subject: row.subject,
        score: row.score,
        registrationDate: row.registrationDate,
      }));

      const formattedStudent = {
        name: response.student.name,
        firstLastName: response.student.firstLastName,
        secondLastName: response.student.secondLastName,
        email: response.student.email,
        score: response.average,
      };

      setData(formattedData);
      setStudent(formattedStudent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idStudent]);

  const handleCreateScore = () => {
    setOpenModalNewScore(true);
  };

  const handleNewScoreClose = () => {
    setOpenModalNewScore(false);

  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    isCustomSnackbarOpen(false);
    setAlertMessage("");
    setAlertSeverity("");
  };

  const handleFormNewScoreSubmit = async (newScoreData) => {
    console.log(newScoreData);
    try {
      const response = await scores_services.create(newScoreData);
      console.log("New Score is created:", response.detail);
      setOpenModal(false);
      isCustomSnackbarOpen(true);
      setAlertMessage("New Score is created");
      setAlertSeverity("success");
      fetchData();
    } catch (error) {
      console.error("Error to create new Score:", error);
      isCustomSnackbarOpen(true);
      setAlertMessage("Error to create new Score:" + error);
      setAlertSeverity("warning");
    }
    setOpenModal(false);
    handleNewScoreClose();
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Button variant="contained" color="primary" onClick={handleCreateScore}>
          New Score
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={idStudent.open}
        onClose={idStudent.onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={idStudent.onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Person />
            <div>
              <Typography variant="h5">
                {student ? (
                  student.name +
                  " " +
                  student.firstLastName +
                  " " +
                  student.secondLastName +
                  " "
                ) : (
                  <p>Loading data ...</p>
                )}
              </Typography>
            </div>

            <div style={{ textAlign: "right", marginLeft: "auto" }}>
              <Typography variant="h7">
                {student ? " Score Average: " + student.score : null}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ height: 400, width: "90%" }}>
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
      </Dialog>
      <NewScoreModal
        open={openModalNewScore}
        onClose={handleNewScoreClose}
        onSubmit={handleFormNewScoreSubmit}
        student_id={idStudent.studentId}
      />
      <CustomSnackbar
        message={alertMessage}
        severity={alertSeverity}
        open={customSnackbarOpen}
        handleClose={handleAlertClose}
      />
    </div>
  );
}
