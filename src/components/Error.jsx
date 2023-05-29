import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Error() {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Button color="error" style={{cursor:'default'}}>
        Error
      </Button>
    </Stack>
  );
}
