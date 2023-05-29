import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import creditFormImage from '../../../../../images/credit form.png'
import notAvailableImage from '../../../../../images/credit form.png'
import DeleteContent from "../../../../components/Admin/DeleteContent";
import EditContent from './../../../../components/Admin/EditContent';

const ExpandMore = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function AdminPortfolio({ user, d }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            maxWidth: 300,
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={
              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                <strong>{d.project_title}</strong>
              </Typography>
            }
          />
          <CardMedia
            component="img"
            style={{ width: "100%", flexGrow: 1, objectFit: "cover" }}
            // height="230"
            image={(() => {
              if (d.project_title.toLowerCase().includes("credit assessment")) {
                return creditFormImage;
              } else if (d.project_image === "") {
                return notAvailableImage;
              } else {
                return d.project_image;
              }
            })()}
            alt={d.project_title}
          />
          <CardContent>
            <Typography variant="body2">
              <strong>Tech Stack/Tools Used:</strong>
              {<br />}
              {d.project_tech_stack}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <EditContent user={user} data={d} contentType={'editPortfolio'}/>
            <DeleteContent user={user} id={d?.id} data={d} contentType={'deletePortfolio'}/>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{d.project_description || null}</Typography>

              <Typography paragraph></Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </>
  );
}
