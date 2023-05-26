import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utilities/users-api";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export default function Skills() {
  const { isLoading, error, data, isFetching } = useQuery("portfolio", () =>
    axios.get(`${baseUrl}portfolios/`).then((response) => {
      console.log(JSON.stringify(response.data), null, 2);
      console.log("data", data);
      return response.data;
    })
  );

  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    if (data) {
      let techWords = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].project_tech_stack) {
          techWords.push(...data[i].project_tech_stack.split(", "));
        }
      }
      setTechStack([...new Set(techWords)]);
    }
  }, [data]);

  if (isLoading || !data) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data && techStack.length ? (
        <>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {techStack.map((tech, index) => (
              <Chip
                label={tech}
                key={index}
                variant="outlined"
                sx={{ fontFamily: 'unset', fontSize: '1em' }}
                
              />
            ))}
          </Box>
        </>
      ) : null}
    </div>
  );
}
