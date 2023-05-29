import React, { usedata } from "react";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function CreatePortfolioForm({ data, handleCreate }) {
  return (
    <>
      <CssBaseline />
      <Grid item xs={12} sm={8} md="auto" lg="auto">
        <Paper elevation={24} sx={{ padding: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom></Typography>

          <TextField
            required
            fullWidth
            label="project_link"
            type="project_link"
            name="project_link"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_link}
          />
          <TextField
            required
            fullWidth
            label="project_title"
            type="project_title"
            name="project_title"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_title}
          />
          <TextField
            required
            fullWidth
            label="project_image"
            type="project_image"
            name="project_image"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_image}
          />
          <TextField
            required
            fullWidth
            label="project_description"
            type="project_description"
            name="project_description"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_description}
          />
          <TextField
            fullWidth
            label="project_tech_stack"
            type="project_tech_stack"
            name="project_tech_stack"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_tech_stack}
          />
          <TextField
            fullWidth
            label="project_demo_link"
            type="project_demo_link"
            name="project_demo_link"
            margin="normal"
            variant="outlined"
            onChange={handleCreate}
            value={data.project_demo_link}
          />
        </Paper>
      </Grid>
    </>
  );
}
