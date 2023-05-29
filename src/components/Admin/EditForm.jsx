import React, { useState } from "react";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function EditForm({ data, handleChange }) {

  return (
    <>
      <CssBaseline />
        <Grid item xs={12} sm={8} md='auto' lg='auto'>
          <Paper elevation={24} sx={{ padding: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom></Typography>
            {Object.keys(data).map((key) => (
               <TextField
               required
               fullWidth
               label={key}
               value={data[key]}
               type={key}
               name={key}
               margin="normal"
               variant="outlined"
               onChange={handleChange}
               disabled={key === 'id' || key === 'project_created_at' || key === 'project_updated_at'}
             /> 
            ))}
          </Paper>
        </Grid>
    </>
  );
}
