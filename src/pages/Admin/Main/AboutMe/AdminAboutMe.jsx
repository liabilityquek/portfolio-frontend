import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from '../../../../utilities/users-api'
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateContent from '../../../../components/Admin/CreateContent'
import DeleteContent from '../../../../components/Admin/CreateContent'
import EditContent from '../../../../components/Admin/CreateContent'
import Loading from "../../../../components/Loading";
import Error from "../../../../components/Error";

export default function AdminAboutMe({ user }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
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
    if (
      data &&
      data[0] &&
      data[0].par_inro &&
      index < data[0].par_inro.length
    ) {
      setTimeout(() => {
        setText(text + data[0].par_inro[index]);
        setIndex(index + 1);
      }, 80);
    }
  }, [data, index]);

  useEffect(() => {
    setText("");
    setIndex(0);
  }, [data]);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <>
        <div>
          <p>
            <strong>
              {data && data[0] ? `${data[0].greeting} ${data[0].name}` : null}
            </strong>
          </p>
          {data && data[0] && data[0].par_inro ? text.toUpperCase() : fullText}
          <p>
            {data && data[0] ? (
              <img
                alt="Harold Quek"
                src={data[0].avatar_img}
                style={{
                  width: "max-width: 100%",
                  height: 300,
                  borderRadius: "50%",
                }}
              />
            ) : null}
          </p>
          <p>
            <a
              href={data && data[0] ? data[0].cv_link : null}
              download="Harold's CV"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                disabled={!data || !data[0] || !data[0].cv_link}
              >
                <Typography sx={{ fontFamily: "fantasy !important" }}>
                  Download CV;

                </Typography>
              </Button>
            </a>
          </p>
          <div>{isFetching ? "Updating..." : ""}</div>
        </div>

        <div>
          {data && data[0] ? (
            <>
            
              <DeleteContent
                user={user}
                id={data[0]?.id}
                style={{ cursor: "pointer" }}
                contentType={'deleteAboutMe'}
              />

              <EditContent
                user={user}
                data={data[0]}
                style={{ cursor: "pointer" }}
                contentType={'editAboutMe'}
              />
            </>
          ) : (
            <CreateContent user={user} style={{ cursor: "pointer" }} contentType='aboutMe' />
          )}
        </div>
    </>
  );
}
