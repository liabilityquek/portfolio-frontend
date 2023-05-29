import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utilities/users-api";
import PortfolioCard from "./PortfolioCard";
import { Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import Loading from "./../../components/Loading";
import Error from "./../../components/Loading";
import { AdminPortfolio } from "./../Admin/Main/Portfolio/AdminPortfolio";
import Box from "@mui/material/Box";
import CreateContent from "./../../components/Admin/CreateContent";

export function ShowPortfolio({ itemsPerPage, user }) {
  const { isLoading, error, data, isFetching } = useQuery("portfolio", () =>
    axios.get(`${baseUrl}portfolios/`).then((response) => {
      console.log(JSON.stringify(response.data), null, 2);
      console.log("data", data);
      return response.data;
    })
  );
  const [page, setPage] = useState(1);

  const handleChange = (value) => {
    setPage(value);
  };

  if (isLoading || !data) return <Loading />;
  if (error) return <Error />;

  if (user !== undefined) {
    return (
      <div>
        {data && data.length > 0 ? (
          <>
            <Grid container spacing={0.5}>
              {data
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((d, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <AdminPortfolio user={user} d={d} />
                  </Grid>
                ))}
            </Grid>
            <Box mt={2}>
              <CreateContent user={user} />
            </Box>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => handleChange(value)}
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "primary",
                },
              }}
            />
          </>
        ) : null}
      </div>
    );
  } else {
    return (
      <div>
        {data && data.length > 0 ? (
          <>
            <Grid container spacing={0.5}>
              {data
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((d, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <PortfolioCard d={d} />
                  </Grid>
                ))}
            </Grid>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => handleChange(value)}
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "primary",
                },
              }}
            />
          </>
        ) : null}
      </div>
    );
  }
}
