import * as React from "react";
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
import Tooltip from "@mui/material/Tooltip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; 
import PreviewIcon from '@mui/icons-material/Preview';
import creditFormImage from '../../../images/credit form.png'
import notAvailableImage from '../../../images/image not available.jpg'

const ExpandMore = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PortfolioCard({ d, error }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (error) {
    return <div>An error has occurred</div>;
  }

  return (
    
    <Box marginTop={4} display="flex" justifyContent="center" alignItems="center" >
      <Card sx={{ maxWidth: 300, minHeight: 400, display: 'flex', flexDirection: 'column'}}>
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
          image={
            (() => {
              console.log('Project title: ', d.project_title.toLowerCase());
              console.log('Condition match: ', d.project_title.toLowerCase().includes('credit assessment'));
              if (d.project_title.toLowerCase().includes('credit assessment')) {
                return creditFormImage;
              } else if (d.project_image === '') {
                return notAvailableImage;
              } else {
                return d.project_image;
              }
            })()
          }
          alt={d.project_title}
        />
        <CardContent>
          <Typography variant="body2">
            <strong>Tech Stack/Tools Used:</strong>
            {<br/>}
            {d.project_tech_stack}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Project Source Code">
            <a href={d.project_link} target="_blank" rel="noopener noreferrer">
              <IconButton aria-label="view more">
                <OpenInNewIcon />
              </IconButton>
            </a>
          </Tooltip>
          {!d.project_title.toLowerCase().includes('portfolio') && d.project_demo_link !== '' ?  
          <Tooltip title="View Demo">
            <a href={d.project_demo_link} target="_blank" rel="noopener noreferrer">
              <IconButton aria-label="view more">
                <PreviewIcon />
              </IconButton>
            </a>
          </Tooltip>
          : null}
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
            <Typography paragraph>
              {d.project_description || "Overview not available."}
            </Typography>

            <Typography paragraph></Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
