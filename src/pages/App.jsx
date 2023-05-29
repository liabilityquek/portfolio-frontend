import React, { useState, useEffect, Suspense } from "react";
import NavBar from "./../components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "react-query";
import Typography from "@mui/material/Typography";
import LightingMode from "../components/LightingMode";
import { Analytics } from "@vercel/analytics/react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminNavBar from "./../components/Admin/AdminNavBar";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Main from '../../src/pages/Admin/Main/Main'
import AboutMe from "./AboutMe/AboutMe";
import Skills from "./Skills/Skills";
import Contact from "./Contacts/Contact";
import Portfolio from "./Portfolio/Portfolio";

// const AboutMe = React.lazy(() => import("./AboutMe/AboutMe"));
// const Skills = React.lazy(() => import("./Skills/Skills"));
// const Contact = React.lazy(() => import("./Contacts/Contact"));
// const Portfolio = React.lazy(() => import("./Portfolio/Portfolio"));

const queryClient = new QueryClient();

export function App() {
  const [user, setUser] = useState("");
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        const token = claims.__raw;
        if (token) {
          const decoded = JSON.parse(window.atob(token.split(".")[1]));
          const username = decoded.nickname;
          console.log("Username: ", username);
          console.log("ID Token: ", claims.__raw);
          setUser(token);
        } else {
          setUser("");
        }
      });
    }
  }, [isAuthenticated, getIdTokenClaims]);

  if (!user) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <LightingMode>
            <CssBaseline />
            <NavBar />

            <Box mt={8}>
              <div id="about">
                {/* <Suspense fallback={<Loading />}> */}
                  <Typography
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    sx={{ marginTop: 15, fontFamily: "monospace" }}
                  >
                    <AboutMe />
                  </Typography>
                {/* </Suspense> */}
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
                {/* <Suspense fallback={<Loading />}> */}
                  <Portfolio />
                {/* </Suspense> */}
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
                {/* <Suspense fallback={<Loading />}> */}
                  <Skills />
                {/* </Suspense> */}
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
                {/* <Suspense fallback={<Loading />}> */}
                  <Contact />
                {/* </Suspense> */}
              </div>
            </Box>
          </LightingMode>
        </QueryClientProvider>
        <Analytics />
      </>
    );
  }

  if (user) {
    return (
      <QueryClientProvider client={queryClient}>
        <LightingMode>
          <CssBaseline />
          <AdminNavBar />

          <Routes>
            <Route path="/" element={<Main user={user} />} />
          </Routes>
        </LightingMode>
      </QueryClientProvider>
    );
  }
}
