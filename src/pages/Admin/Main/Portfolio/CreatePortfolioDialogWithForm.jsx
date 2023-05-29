import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CreatePortfolioForm from "./CreatePortfolioForm";
import React from "react";
import { useState, useEffect } from "react";

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

export default function CreatePortfolioDialogWithForm({ open, handleClose, handleCreate }) {
  const [formData, setFormData] = useState({
    greeting: '',
    name: '',
    par_inro: '',
    avatar_img:'',
    cv_link:'',
  });

  const handleSubmit = () => {
    handleCreate(formData);
    handleClose();
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
          Create AboutMe
        </BootstrapDialogTitle>
        <DialogContent dividers>
          
          <CreatePortfolioForm data={formData} handleCreate={handleInputChange}/>
        
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
