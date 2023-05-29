import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState, useEffect } from "react";
import EditForm from "./EditForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
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
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function EditDialogWithForm({ open, handleClose, handleChange, data, dialogMsg }) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = () => {
    handleChange(formData);
    handleClose();
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    setFormData(data)
  }, [data])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {/* Amend Social Links */}
          {dialogMsg}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          
          <EditForm data={formData} handleChange={handleInputChange} />
        
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            color="primary"
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
