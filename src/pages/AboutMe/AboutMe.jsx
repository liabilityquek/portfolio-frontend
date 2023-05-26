import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utilities/users-api";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AboutMe() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  // const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [fullText, setFullText] = useState(null);
  
  const { isLoading, error, data, isFetching } = useQuery("aboutMe", () =>
    axios.get(`${baseUrl}profile/`).then((response) => {
      console.log(JSON.stringify(response.data), null, 2);
      if (response.data[0] && response.data[0].par_inro) {
        setFullText(response.data[0].par_inro);
      } else {
        setFullText("No information available.");
      }
      return response.data;
    })
  );
  
  useEffect(() => {
    if (fullText && index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 80);
    }
  }, [fullText, index]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Send the user object to your Django backend
  //     axios.post(`${baseUrl}login/`, user)
  //     .then(response => {
  //       // Handle response
  //       console.log(JSON.stringify(response.data), null, 2);
  //     })
  //       .catch(error => {
  //         // Handle error
  //         console.error(error);
  //       });
  //   }
  // }, [isAuthenticated, user]);

  
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  // const handleLogin = () => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // };

  return (
    <>
      <div>
        <p>
          <strong>
            {data && data[0] ? `${data[0].greeting} ${data[0].name}` : null}
          </strong>
        </p>
        {fullText !== "No information available." ? text.toUpperCase() : <p>{fullText}</p>}
        <p>
          {data && data[0] ? (
            <img
              alt="Harold Quek"
              src={data[0].avatar_img}
              style={{
                width: "max-width: 100%",
                height: 300,
                borderRadius: "50%",
                cursor:'pointer',
              }}
              // onClick={ handleLogin }
            />
          ) : <img
          alt="Harold Quek"
          src='../images/image not available.jpg'
          style={{
            width: "max-width: 100%",
            height: 300,
            borderRadius: "50%",
            cursor:'pointer',
          }}
          // onClick={ handleLogin }
        />}
        </p>
        <p>
          <a
            href={data && data[0] ? data[0].cv_link : null}
            download="Harold's CV"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none'}}
            
          >
            <Button variant="contained" disabled={ !data || !data[0]}>
              <Typography sx={{ fontFamily: "fantasy !important" }}>
                Download CV
              </Typography>
            </Button>
          </a>
        </p>
        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </>
  );
}