import React from "react";
import NavBar from "./../components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { AboutMe } from "./AboutMe/AboutMe";
import { QueryClient, QueryClientProvider } from "react-query";
import { Portfolio } from "./Portfolio/Portfolio";
import Typography from "@mui/material/Typography";
import { Contact } from "./Contacts/Contact";
import { Skills } from "./Skills/Skills";
import LightingMode from "../components/LightingMode";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LightingMode>
        <CssBaseline />
        <NavBar />
        <Box mt={8}>
          <div id="about">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ marginTop: 15, fontFamily: 'monospace' }}
            >
              <AboutMe id="aboutme" />
            </Typography>
          </div>
        </Box>
        <Box mt={10}>
          <div id="portfolio">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily:'monospace' }}
            >
              PORTFOLIO
            </Typography>
            <Portfolio />
          </div>
        </Box>
        <Box mt={10}>
          <div id="tech stack">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily:'monospace' }}
            >
              TECH STACK
            </Typography>
            <Skills />
          </div>
        </Box>
        <Box mt={10}>
          <div id="contact">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily:'monospace' }}
            >
              CONNECT WITH ME
            </Typography>
            <Contact />
          </div>
        </Box>
      </LightingMode>
    </QueryClientProvider>
  );
}
