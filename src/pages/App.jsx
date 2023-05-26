import React, { useState, useEffect, Suspense } from "react";
import NavBar from "./../components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "react-query";
import Typography from "@mui/material/Typography";
import LightingMode from "../components/LightingMode";

const AboutMe = React.lazy(() => import("./AboutMe/AboutMe"));
const Skills = React.lazy(() => import("./Skills/Skills"));
const Contact = React.lazy(() => import("./Contacts/Contact"));
const Portfolio = React.lazy(() => import("./Portfolio/Portfolio"));

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LightingMode>
        <CssBaseline />
        <NavBar />

        <Box mt={8}>
          <div id="about">
            <Suspense fallback={<span>Loading...</span>}>
              <Typography
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ marginTop: 15, fontFamily: "monospace" }}
              >
                <AboutMe />
              </Typography>
            </Suspense>
          </div>
        </Box>
        <Box mt={10}>
          <div id="portfolio">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily: "monospace" }}
            >
              PORTFOLIO
            </Typography>
            <Suspense fallback={<span>Loading...</span>}>
              <Portfolio />
            </Suspense>
          </div>
        </Box>
        <Box mt={10}>
          <div id="tech stack">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily: "monospace" }}
            >
              TECH STACK
            </Typography>
            <Suspense fallback={<span>Loading...</span>}>
              <Skills />
            </Suspense>
          </div>
        </Box>
        <Box mt={10}>
          <div id="contact">
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily: "monospace" }}
            >
              CONNECT WITH ME
            </Typography>
            <Suspense fallback={<span>Loading...</span>}>
              <Contact />
            </Suspense>
          </div>
        </Box>
      </LightingMode>
    </QueryClientProvider>
  );
}
