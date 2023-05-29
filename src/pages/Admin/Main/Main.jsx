import AdminAboutMe from "../../../pages/Admin/Main/AboutMe/AdminAboutMe";
import AdminContact from "../../../pages/Admin/Main/Contacts/AdminContact";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skills from '../../../pages/Skills/Skills'
import Portfolio from "../../../pages/Portfolio/Portfolio";
import React from "react"; 

export default function Main({ user }) {
  return (
    <>
      <Box mt={8}>
        <div id="about">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ marginTop: 15, fontFamily: "monospace" }}
          >
            <AdminAboutMe user={user} />
          </Typography>
        </div>
      </Box>
      <Box mt={8}>
        <div id="portfolio">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ marginTop: 15, fontFamily: "monospace" }}
          >
            PORTFOLIO
          </Typography>
          <Portfolio user={user} />
          
        </div>
      </Box>
      <Box mt={8}>
        <div id="tech stack">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ marginTop: 15, fontFamily: "monospace" }}
          >
            TECH STACK
          </Typography>
          <Skills />
        </div>
      </Box>
      {/* <Card sx={{ display: "flex", flexDirection: "column", padding: "20px" }}> */}
      <Box mt={8}>
        <div id="contact">
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ marginTop: 15, fontFamily: "monospace" }}
          >
            CONNECT WITH ME
          </Typography>
          <AdminContact user={user} />
        </div>
      </Box>
      {/* </Card> */}
    </>
  );
}
