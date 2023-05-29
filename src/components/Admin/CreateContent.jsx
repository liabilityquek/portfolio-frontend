import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { baseUrl } from './../../utilities/users-api';
import CreateDialogWithForm from '../../pages/Admin/Main/AboutMe/CreateDialogWithForm'
import CreatePortfolioDialogWithForm from '../../pages/Admin/Main/Portfolio/CreatePortfolioDialogWithForm'

export default function CreateContent({ user, contentType }) {
  const [portfolioDialogOpen, setPortfolioDialogOpen] = useState(false);
  const [aboutMeDialogOpen, setAboutMeDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const createPortfolioMutation = useMutation(
    (newData) =>
      axios.post(`${baseUrl}portfolios/create/`, newData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolio"]);
      },
      retry: 3,
    }
  );

  const createAboutMeMutation = useMutation(
    (newData) =>
      axios.post(`${baseUrl}profile/create/`, newData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["aboutMe"]);
      },
      retry: 3,
    }
  );

  const handleOpenPortfolioDialog = () => {
    setPortfolioDialogOpen(true);
  };

  const handleClosePortfolioDialog = () => {
    setPortfolioDialogOpen(false);
  };

  const handleOpenAboutMeDialog = () => {
    setAboutMeDialogOpen(true);
  };

  const handleCloseAboutMeDialog = () => {
    setAboutMeDialogOpen(false);
  };

  const handleCreatePortfolio = (newData) => {
    createPortfolioMutation.mutate(newData);
  };

  const handleCreateAboutMe = (newData) => {
    createAboutMeMutation.mutate(newData);
  };

  const isLoading =
    createPortfolioMutation.isLoading || createAboutMeMutation.isLoading;
  const error = createPortfolioMutation.error || createAboutMeMutation.error;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {contentType !== "aboutMe" ? (
          <Tooltip title="Create New Portfolio">
            <AddCircleRoundedIcon
              onClick={handleOpenPortfolioDialog}
              sx={{
                cursor: "pointer",
                fontSize: "35px",
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Create New About Me">
            <AddCircleRoundedIcon
              onClick={handleOpenAboutMeDialog}
              sx={{
                cursor: "pointer",
                fontSize: "35px",
              }}
            />
          </Tooltip>
        )}
      </Box>
      <CreatePortfolioDialogWithForm
        handleClose={handleClosePortfolioDialog}
        handleCreate={handleCreatePortfolio}
        open={portfolioDialogOpen}
      />
      <CreateDialogWithForm
        handleClose={handleCloseAboutMeDialog}
        handleCreate={handleCreateAboutMe}
        open={aboutMeDialogOpen}
      />
    </>
  );
}
