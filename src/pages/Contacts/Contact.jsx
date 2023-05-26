import React from "react";
import { useQueries, useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utilities/users-api";
import { useState, useEffect } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import IconButton from "@mui/material/IconButton";

export default function Contact() {
  // const contactQueries = useQueries([
  //   {
  //     queryKey: 'contacts',
  //     queryFn: () => axios.get(`${baseUrl}contacts/`).then(response => response.data),
  //   },
  //   {
  //     queryKey: 'socials',
  //     queryFn: () => axios.get(`${baseUrl}socials/`).then(response => response.data),
  //   },
  // ]);

  // const contactQuery = contactQueries[0];
  // const socialQuery = contactQueries[1];

  // if (contactQuery.isLoading || socialQuery.isLoading) return "Loading...";

  // if (contactQuery.error) return <div>An error has occurred</div>;

  //need to call socialQuery.data[0].name
  const { isLoading, error, data, isFetching } = useQuery("socials", () =>
  axios.get(`${baseUrl}socials/`).then((response) => {
    console.log(JSON.stringify(response.data), null, 2);
    return response.data;
  })
);
if (isLoading) return "Loading...";

if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data ? (
        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" marginTop={4}>
          {data.map((d) => {
            if (d.name.toLowerCase() === 'linkedln') {
              return (
                <a href={d.link} target="_blank" rel="noopener noreferrer">
                  <IconButton >
                  <LinkedInIcon fontSize='large'/>
                  </IconButton>
                </a>
              );
            }
            if (d.name.toLowerCase() === 'github') {
              return (
                <a href={d.link} target="_blank" rel="noopener noreferrer">
                  <IconButton >
                  <GitHubIcon fontSize='large'/>
                  </IconButton>
                </a>
              );
            }
            if (d.name.toLowerCase() === 'gmail') {
              return (
                <a href={d.link} target="_blank" rel="noopener noreferrer">
                  <IconButton >
                  <MailIcon fontSize='large'/>
                  </IconButton>
                </a>
              );
            }
            return null;
          })}

        </Stack>
      ) : null}
    </>
  );
}