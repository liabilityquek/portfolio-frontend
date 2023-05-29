import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from './../../utilities/users-api';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditDialogWithForm from './EditDialogWithForm'
import Tooltip from "@mui/material/Tooltip";
import Loading from '../../components/Loading'
import Error from '../../components/Error'

export default function EditContent({ user, data, contentType }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");

  const queryClient = useQueryClient();

  const updateAboutMeMutation = useMutation(
    (updateData) =>
      axios.put(`${baseUrl}profile/${updateData.id}/`, updateData, {
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

  const updatePortfolioMutation = useMutation(
    (updateData) =>
      axios.put(`${baseUrl}portfolios/${updateData.id}/`, updateData, {
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

  const updateSocialMutation = useMutation(
    (updateData) =>
      axios.put(`${baseUrl}socials/${updateData.id}/`, updateData, {
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

  const handleChange = (formData) => {
    const updateData = {
      ...formData,
      id: data?.id,
    };
    if (updateData.id && contentType === "editAboutMe") {
      updateAboutMeMutation.mutate(updateData);
    }
    if (updateData.id && contentType === "editPortfolio") {
      updatePortfolioMutation.mutate(updateData);
    }
    if (updateData.id && contentType === "editContact") {
        updateSocialMutation.mutate(updateData);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setDialogMsg("Amend AboutMe");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMsg("");
  };

  const isLoading =
    updateAboutMeMutation.isLoading ||
    updateSocialMutation.isLoading ||
    updatePortfolioMutation.isLoading;
  const error =
    updateAboutMeMutation.error ||
    updateSocialMutation.error ||
    updatePortfolioMutation.isError;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {contentType === "editAboutMe" && (
        <Tooltip title="Edit About Me Profile">
          <EditOutlinedIcon
            onClick={handleOpenDialog}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}

      {contentType === "editPortfolio" && (
        <Tooltip title={`Edit ${data.project_title}`}>
          <EditOutlinedIcon
            onClick={handleOpenDialog}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}

      {contentType === "editContact" && (
        <Tooltip title={`Edit ${data.name}`}>
          <EditOutlinedIcon
            onClick={handleOpenDialog}
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}

      <EditDialogWithForm
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleChange={handleChange}
        data={data}
        dialogMsg={dialogMsg}
      />
    </>
  );
}
