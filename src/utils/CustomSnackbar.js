import { Box,Alert,Snackbar } from "@mui/material";

function CustomSnackbar(props) {
  const { message , open , severity,handleClose} = props;
  const vertical = "top";
  const horizontal = "center";

 let severityFinal = (severity === "" ? "warning" : severity);

  return (
    <Box spacing={2}>
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={6000}
      sx={{ width: 900 }}
      onClose={handleClose}
    >
      <Alert severity={severityFinal}  sx={{ width: "100%" }} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
    </Box>

  );
}

export default CustomSnackbar;