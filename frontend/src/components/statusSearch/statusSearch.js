import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";

StatusSearch.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func,
  messageSuccess: PropTypes.string,
  messageError: PropTypes.string,
  messageErrorForm: PropTypes.string,
};

export default function StatusSearch({
  status = null,
  setStatus,
  messageSuccess = "Consulta exitosa",
  messageError = "Error en la consulta",
  messageErrorForm = "Faltan datos por llenar",
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status) setOpen(true);
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    setStatus(null);
  };

  if (status === "progress")
    return (
      <Box display="flex" justifyContent="center" padding={5}>
        <CircularProgress />
      </Box>
    );

  if (status === "error")
    return (
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {messageError}
        </Alert>
      </Snackbar>
    );

  if (status === "errorForm")
    return (
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {messageErrorForm}
        </Alert>
      </Snackbar>
    );

  if (status === "success")
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {messageSuccess}
        </Alert>
      </Snackbar>
    );

  return <></>;
}
