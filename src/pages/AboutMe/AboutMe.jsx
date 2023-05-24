import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utilities/users-api";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function AboutMe() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  const { isLoading, error, data, isFetching } = useQuery("aboutMe", () =>
    axios.get(`${baseUrl}profile/`).then((response) => {
      console.log(JSON.stringify(response.data), null, 2);
      setFullText(response.data[0].par_inro);
      return response.data;
    })
  );

  const [fullText, setFullText] = useState(data && data[0]?.par_inro);

  useEffect(() => {
    if (fullText && index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 80);
    }
  }, [fullText, index]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <>
   
      <div>
        <p>
          <strong>
            {data ? `${data[0].greeting} ${data[0].name}` : "Loading..."}
          </strong>
        </p>
        {data ? text.toUpperCase() : "Loading..."}
        <p>
          {data ? (
            <img
              alt="Harold Quek"
              src={data[0].avatar_img}
              style={{
                width: "max-width: 100%",
                height: 300,
                borderRadius: "50%",
                cursor:'pointer'
              }}
            />
          ) : null}
        </p>
        <p>
          <a
            href={data && data[0]?.cv_link}
            download="Harold's CV"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none'}}
          >
            <Button variant="contained" disabled={!data[0].cv_link}>
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
