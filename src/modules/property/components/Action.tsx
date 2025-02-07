import { Box, useTheme } from '@mui/material';
import { icons } from '@src/utils/icons';
import React from 'react'
import { useNavigate } from 'react-router';

const Action = ({ propertyId }: {propertyId: string}) => {
    const theme = useTheme();
    const navigate = useNavigate()
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "28px 32px",
        // justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="button"
          onClick={() => navigate(`${propertyId}/view`)}
          sx={{ background: "none", border: "none", cursor: "pointer", p: 0 }}
        >
          <Box component="img" src={icons.eye} sx={{ width: 18 }} />
        </Box>
        <Box
          component="button"
          sx={{ background: "none", border: "none", cursor: "pointer", p: 0 }}
        >
          <Box component="img" src={icons.edit} sx={{ width: 18 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Action
