import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from './../../utilities/users-api';
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import Loading from '../../components/Loading'
import Error from '../../components/Error'

export default function DeleteContent({ user, id, data, contentType }) {
  const queryClient = useQueryClient();

  const deleteSocialMutation = useMutation(
    (id) =>
      axios.delete(`${baseUrl}socials/${id}/`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["socials"]);
      },
      retry: 3,
    }
  );

  const deletePortfolioMutation = useMutation(
    (id) =>
      axios.delete(`${baseUrl}portfolios/${id}/`, {
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

  const deleteAboutMeMutation = useMutation(
    (id) =>
      axios.delete(`${baseUrl}profile/${id}/`, {
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

  const handleSocialDelete = () => {
    if (id) {
      deleteSocialMutation.mutate(id);
    } else {
      console.error("Undefined id passed to DeleteContact");
    }
  };

  const handlPortfolioDelete = () => {
    if (id) {
      deletePortfolioMutation.mutate(id);
    } else {
      console.error("Undefined id passed to DeletePortfolio");
    }
  };

  const handleAboutMeDelete = () => {
    if (id) {
      deleteAboutMeMutation.mutate(id);
    } else {
      console.error("Undefined id passed to DeleteAboutMe");
    }
  };
  const isLoading =
    deleteSocialMutation.isLoading ||
    deleteAboutMeMutation.isLoading ||
    deletePortfolioMutation.isLoading;

  const error =
    deleteSocialMutation.isError ||
    deleteAboutMeMutation.isError ||
    deletePortfolioMutation.isError;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {contentType === "deleteContact" && (
        <Tooltip title={`Delete ${data.name}`}>
          <ClearIcon
            onClick={handleSocialDelete}
            style={{ cursor: "pointer" }}
            sx={{ mr: 2 }}
          />
        </Tooltip>
      )}

      {contentType === "deletePortfolio" && (
        <Tooltip title={`Delete ${data.project_title}`}>
          <ClearIcon
            onClick={handlPortfolioDelete}
            style={{ cursor: "pointer" }}
            sx={{ mr: 2 }}
          />
        </Tooltip>
      )}
      {contentType === "deleteAboutMe" && (
        <Tooltip title={`Delete About Me Profile`}>
          <ClearIcon
            onClick={handleAboutMeDelete}
            style={{ cursor: "pointer" }}
            sx={{ mr: 2 }}
          />
        </Tooltip>
      )}
    </>
  );
}
