import * as React from 'react';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function LightModeToggle() {
  const theme = useTheme();
  return (
      <IconButton color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

  );
}
