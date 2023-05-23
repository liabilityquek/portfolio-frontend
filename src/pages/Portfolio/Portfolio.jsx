import React from "react";
import Typography from "@mui/material/Typography";
import { ShowPortfolio } from "./ShowPortfolio";

export function Portfolio() {
  return (
    <>
    <div>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ color: "white", marginTop: 4 }}
      ></Typography>
      <ShowPortfolio itemsPerPage={6}/>
      </div>
    </>
  );
}
