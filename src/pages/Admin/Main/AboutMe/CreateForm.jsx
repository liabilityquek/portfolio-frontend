import React, { usedata } from "react";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function CreateForm({ data, handleCreate }) {
  return (
    <>
      <CssBaseline />
      <Grid item xs={12} sm={8} md="auto" lg="auto">
        <Paper elevation={24} sx={{ padding: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom></Typography>

          <TextField
            required
            fullWidth
            label="greeting"
            type="greeting"
            name="greeting"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.greeting}
          />
          <TextField
            required
            fullWidth
            label="name"
            type="name"
            name="name"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.name}
          />
          <TextField
            required
            fullWidth
            label="par_inro"
            type="par_inro"
            name="par_inro"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.par_inro}
          />
          <TextField
            required
            fullWidth
            label="avatar_img"
            type="avatar_img"
            name="avatar_img"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.avatar_img}
          />
          <TextField
            fullWidth
            label="cv_link"
            type="cv_link"
            name="cv_link"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.cv_link}
          />
        </Paper>
      </Grid>
    </>
  );
}
